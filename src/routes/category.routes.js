import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const categoryRoutes = async (req, res) => {
  if (req.url === "/api/categories" && req.method === "GET") {
    const categories = await getAllCategories();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(categories));
  } else if (req.url === "/api/categories" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const category = JSON.parse(body);
      const result = await createCategory(category);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    });
  } else if (
    req.url?.match(/\/api\/categories\/([0-9a-fA-F]+)/) &&
    req.method === "GET"
  ) {
    const id = req.url.split("/")[3];
    const category = await getCategoryById(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(category));
  } else if (
    req.url?.match(/\/api\/categories\/([0-9a-fA-F]+)/) &&
    req.method === "PATCH"
  ) {
    const id = req.url.split("/")[3];
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", async () => {
      const category = JSON.parse(body);
      const result = await updateCategory(id, category);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Category Updated", result }));
    });
  } else if (
    req.url?.match(/\/api\/categories\/([0-9a-fA-F]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    const result = await deleteCategory(id);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Category Deleted", result }));
  }
};

export default categoryRoutes;
