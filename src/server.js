import { createServer } from "http";
import { client } from "./db.js";
import productRoutes from "./routes/product.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const server = createServer(async (req, res) => {
  try {
    await client.connect();
    if (req.url?.startsWith("/api/categories")) {
      await categoryRoutes(req, res);
    }
    else if (req.url?.startsWith("/api/products")) {
      await productRoutes(req, res);
    } else if (req.url?.startsWith("/api/reviews")) {
      await reviewRoutes(req, res);
    } else if (req.url === "/api") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "API is running" }));
    } else if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>Server is running</h1>");
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>Not Found</h1>");
    }
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  }
});

const port = 5000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
