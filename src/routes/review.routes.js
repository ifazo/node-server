import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

const reviewRoutes = async (req, res) => {
  if (req.url === "/api/reviews" && req.method === "GET") {
    const reviews = await getAllReviews();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(reviews));
  } else if (req.url === "/api/reviews" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const review = JSON.parse(body);
      const result = await createReview(review);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    });
  } else if (req.url?.match(/\/api\/reviews\/([0-9a-fA-F]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    const review = await getReviewById(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(review));
  } else if (req.url?.match(/\/api\/reviews\/([0-9a-fA-F]+)/) && req.method === "PATCH") {
    const id = req.url.split("/")[3];
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const review = JSON.parse(body);
      const result = await updateReview(id, review);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Review Updated", result }));
    });
  } else if (req.url?.match(/\/api\/reviews\/([0-9a-fA-F]+)/) && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    const result = await deleteReview(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Review Deleted", result }));
  }
};

export default reviewRoutes;