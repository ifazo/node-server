import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb+srv://admin:12345@cluster0.qyb0v.mongodb.net/node_db?retryWrites=true&w=majority";

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const database = client.db(process.env.MONGODB_DB || "node_db");
// export const productCollection = database.collection("products");
// export const reviewCollection = database.collection("reviews");