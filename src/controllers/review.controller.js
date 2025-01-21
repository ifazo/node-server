import { reviewsCollection } from "../models/review.model.js";
import { ObjectId } from "mongodb";

export const getAllReviews = async () => {
  return await reviewsCollection.find({}).toArray();
};

export const getReviewById = async (id) => {
  return await reviewsCollection.findOne({ _id: new ObjectId(id) });
};

export const createReview = async (review) => {
  return await reviewsCollection.insertOne(review);
};

export const updateReview = async (id, review) => {
  return await reviewsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: review }
  );
};

export const deleteReview = async (id) => {
  return await reviewsCollection.deleteOne({ _id: new ObjectId(id) });
};
