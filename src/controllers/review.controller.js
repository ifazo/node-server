import { ObjectId } from "mongodb";
import { reviewCollection } from "../db.js";

export const getAllReviews = async () => {
  return await reviewCollection.find({}).toArray();
};

export const getReviewById = async (id) => {
  return await reviewCollection.findOne({ _id: new ObjectId(id) });
};

export const createReview = async (review) => {
  return await reviewCollection.insertOne(review);
};

export const updateReview = async (id, review) => {
  return await reviewCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: review }
  );
};

export const deleteReview = async (id) => {
  return await reviewCollection.deleteOne({ _id: new ObjectId(id) });
};
