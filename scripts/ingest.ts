import { loadEnv } from "../lib/ingest/env";

loadEnv();

async function main() {
  const { runIngest } = await import("../lib/ingest/run");
  const cityArg = process.argv.slice(2).find((a) => !a.startsWith("-"));

  if (!process.env.MONGODB_URI) {
    console.error(
      "MONGODB_URI is not set. Add it to .env.local before running the ingest.",
    );
    process.exit(1);
  }

  console.log(`Starting ingest${cityArg ? ` for ${cityArg}` : ""}…`);
  const summaries = await runIngest({
    city: cityArg,
    log: (message) => console.log(message),
  });

  const total = summaries.reduce((sum, s) => sum + s.upserted, 0);
  console.log(`\nDone. ${total} events upserted.`);
  for (const s of summaries) {
    console.log(
      `  ${s.city}/${s.adapter}: fetched=${s.fetched} upserted=${s.upserted} skipped=${s.skipped} errors=${s.errors.length}`,
    );
  }

  const { default: mongoose } = await import("mongoose");
  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
