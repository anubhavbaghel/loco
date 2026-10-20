import dns from "node:dns";

const FALLBACK_DNS = ["8.8.8.8", "1.1.1.1"];

function isLoopback(server: string): boolean {
  return server === "::1" || server === "localhost" || server.startsWith("127.");
}

function createResolver(): dns.promises.Resolver {
  const configured = dns.getServers();

  const override = (process.env.MONGODB_DNS_SERVERS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const servers = override.length
    ? override
    : configured.length === 0 || configured.every(isLoopback)
      ? FALLBACK_DNS
      : configured;

  const resolver = new dns.promises.Resolver();
  resolver.setServers(servers);
  return resolver;
}

/**
 * `mongodb+srv://` URIs need SRV/TXT lookups, which the Node driver performs on
 * the global c-ares channel. On networks that hand Node a loopback stub
 * resolver (VPNs, DNS proxies, some routers) that channel fails with
 * `querySrv ECONNREFUSED`, even though the OS resolver works and public
 * resolvers are reachable. An explicit `Resolver` is unaffected, so the SRV
 * lookup is done here and the driver is handed a plain `mongodb://` string.
 *
 * Set `MONGODB_DNS_SERVERS` (comma separated) to force specific resolvers.
 */
export async function resolveMongoUri(uri: string): Promise<string> {
  if (!uri.startsWith("mongodb+srv://")) return uri;

  const rest = uri.slice("mongodb+srv://".length);
  const at = rest.lastIndexOf("@");
  const credentials = at === -1 ? "" : rest.slice(0, at + 1);
  const target = at === -1 ? rest : rest.slice(at + 1);

  const slash = target.indexOf("/");
  const host = slash === -1 ? target : target.slice(0, slash);
  const tail = slash === -1 ? "" : target.slice(slash);

  const queryAt = tail.indexOf("?");
  const dbPath = queryAt === -1 ? tail : tail.slice(0, queryAt);
  const queryString = queryAt === -1 ? "" : tail.slice(queryAt + 1);

  const resolver = createResolver();
  const srvName = `_mongodb._tcp.${host}`;

  const [records, txtRecords] = await Promise.all([
    resolver.resolveSrv(srvName),
    resolver.resolveTxt(srvName).catch(() => [] as string[][]),
  ]);

  if (records.length === 0) {
    throw new Error(`No SRV records found for ${host}`);
  }

  const hosts = records
    .map((record) => `${record.name}:${record.port}`)
    .join(",");

  const params = new URLSearchParams();
  for (const source of [queryString, txtRecords.flat().join("&")]) {
    if (!source) continue;
    for (const [key, value] of new URLSearchParams(source)) {
      params.set(key, value);
    }
  }
  params.set("tls", "true");

  return `mongodb://${credentials}${hosts}${dbPath}?${params.toString()}`;
}
