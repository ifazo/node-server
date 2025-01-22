import { ObjectId } from "mongodb";
import { categoryCollection } from "../db.js";

export const getAllCategories = async () => {
  return await categoryCollection.find({}).toArray();
};

export const getCategoryById = async (id) => {
  return await categoryCollection.findOne({ _id: new ObjectId(id) });
};

export const createCategory = async (category) => {
  return await categoryCollection.insertOne(category);
};

export const updateCategory = async (id, category) => {
  return await categoryCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: category }
  );
};

export const deleteCategory = async (id) => {
  return await categoryCollection.deleteOne({ _id: new ObjectId(id) });
};
