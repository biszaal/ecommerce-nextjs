import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
let cachedClient = null;

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environment variable");
  }

  if (cachedClient) {
    return { client: cachedClient, db: cachedClient.db() };
  }

  const client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  cachedClient = client;

  return { client, db: client.db() };
}
