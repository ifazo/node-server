import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const database = client.db(process.env.MONGODB_DB);

export const userCollection = database.collection("users");
export const categoryCollection = database.collection("categories");
export const productCollection = database.collection("products");
export const reviewCollection = database.collection("reviews");
