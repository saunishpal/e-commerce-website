import mongoose from "mongoose";

function getMongoUri(): string {
  const value = process.env["MONGODB_URI"];

  if (!value) {
    throw new Error("Missing MONGODB_URI in environment variables");
  }

  return value;
}

const mongoUri = getMongoUri();

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cached: MongooseCache =
  globalForMongoose.mongooseCache ?? {
    conn: null,
    promise: null,
  };

if (!globalForMongoose.mongooseCache) {
  globalForMongoose.mongooseCache = cached;
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(mongoUri);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
