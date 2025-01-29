import { createServer } from "http";
import dotenv from "dotenv";
import { userRoutes } from "./routes/user.routes.js";
import { productRoutes } from "./routes/product.routes.js";

dotenv.config();

const server = createServer(async (req, res) => {
  try {
    // User routes
    if (req.url?.startsWith("/api/users")) {
      await userRoutes(req, res);
    }
    // Product routes
   else if (req.url?.startsWith("/api/products")) {
      await productRoutes(req, res);
    } 
    // Home routes
    else if (req.url === "/api") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Node.js api is running successfully!" }));
    } else if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>Node.js Server is running successfully!</h1>");
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
