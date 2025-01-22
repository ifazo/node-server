import { ObjectId } from "mongodb";
import { productCollection } from "../db.js";

export const getAllProducts = async () => {
  return await productCollection.find({}).toArray();
};

export const getProductById = async (id) => {
  return await productCollection.findOne({ _id: new ObjectId(id) });
};

export const createProduct = async (product) => {
  return await productCollection.insertOne(product);
};

export const updateProduct = async (id, product) => {
  return await productCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: product }
  );
};

export const deleteProduct = async (id) => {
  return await productCollection.deleteOne({ _id: new ObjectId(id) });
};
