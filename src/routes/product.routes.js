import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const productRoutes = async (req, res) => {
  if (req.url === "/api/products" && req.method === "GET") {
    const products = await getAllProducts();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  } else if (req.url === "/api/products" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const product = JSON.parse(body);
      const result = await createProduct(product);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    });
  } else if (req.url?.match(/\/api\/products\/([0-9a-fA-F]+)/) && req.method === "GET") {
    const id = req.url.split("/")[3];
    const product = await getProductById(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(product));
  } else if (req.url?.match(/\/api\/products\/([0-9a-fA-F]+)/) && req.method === "PATCH") {
    const id = req.url.split("/")[3];
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const product = JSON.parse(body);
      const result = await updateProduct(id, product);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product Updated", result }));
    });
  } else if (req.url?.match(/\/api\/products\/([0-9a-fA-F]+)/) && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    const result = await deleteProduct(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Product Deleted", result }));
  }
};

export default productRoutes;