import mongoose, { Mongoose } from "mongoose";
import { resolveMongoUri } from "@/lib/mongoDns";

type MongooseCache = {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached = globalThis.mongoose ?? {
  conn: null,
  promise: null,
};

globalThis.mongoose = cached;

async function dbConnect() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI environment variable inside .env.local");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = resolveMongoUri(MONGODB_URI)
      .catch((error: unknown) => {
        console.warn(
          "[mongodb] SRV lookup failed, falling back to the original URI:",
          error instanceof Error ? error.message : error,
        );
        return MONGODB_URI;
      })
      .then((uri) => mongoose.connect(uri))
      .catch((error: unknown) => {
        cached.promise = null;
        throw error;
      });
  }

  cached.conn = await cached.promise;

  return cached.conn;
}

export default dbConnect;
