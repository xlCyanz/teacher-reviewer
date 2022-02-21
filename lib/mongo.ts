import { MongoClient } from "mongodb";

const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const clientPromise = MongoClient.connect(`${MONGO_URI}`);

export default clientPromise;
