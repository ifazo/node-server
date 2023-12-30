const http = require("http");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://admin:12345@cluster0.qyb0v.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const server = http.createServer(async (req, res) => {
  try {
    await client.connect();
    const database = client.db("nodejs");
    const userCollection = database.collection("users");
    const categoriesCollection = database.collection("categories");
    const productCollection = database.collection("products");
    const reviewsCollection = database.collection("reviews");
    const wishlistCollection = database.collection("wishlist");
    const cartCollection = database.collection("cart");
    const ordersCollection = database.collection("orders");
    // Routes
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("<h1>Hello World</h1>");
      res.end();
    }
    // Ger Users
    else if (req.url === "/api/users" && req.method === "GET") {
      const users = await userCollection.find({}).toArray();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(users));
      res.end();
    }
    // Create User
    else if (req.url === "/api/users" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {
        const user = JSON.parse(body);
        await userCollection.insertOne(user);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(JSON.stringify(user));
        res.end();
      });
    }
    // Get User
    else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === "GET") {
      const id = req.url.split("/")[3];
      const user = await userCollection.findOne({ _id: new ObjectId(id) });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(user));
      res.end();
    }
    // Update User
    else if (
      req.url.match(/\/api\/users\/([0-9]+)/) &&
      req.method === "PATCH"
    ) {
      const id = req.url.split("/")[3];
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {
        const user = JSON.parse(body);
        await userCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: user }
        );
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "User Updated" }));
        res.end();
      });
    }
    // Delete User
    else if (
      req.url.match(/\/api\/users\/([0-9]+)/) &&
      req.method === "DELETE"
    ) {
      const id = req.url.split("/")[3];
      await userCollection.deleteOne({ _id: new ObjectId(id) });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "User Deleted" }));
      res.end();
    }
    // Get Categories
    else if (req.url === "/api/categories" && req.method === "GET") {
      const categories = await categoriesCollection.find({}).toArray();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(categories));
      res.end();
    }
    // Create Category
    else if (req.url === "/api/categories" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {
        const category = JSON.parse(body);
        await categoriesCollection.insertOne(category);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(JSON.stringify(category));
        res.end();
      });
    }
    // Get Category
    else if (
      req.url.match(/\/api\/categories\/([0-9]+)/) &&
      req.method === "GET"
    ) {
      const id = req.url.split("/")[3];
      const category = await categoriesCollection.findOne({
        _id: new ObjectId(id),
      });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(category));
      res.end();
    }
    // Update Category
    else if (
      req.url.match(/\/api\/categories\/([0-9]+)/) &&
      req.method === "PATCH"
    ) {
      const id = req.url.split("/")[3];
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {
        const category = JSON.parse(body);
        await categoriesCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: category }
        );
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Category Updated" }));
        res.end();
      });
    }
    // Delete Category
    else if (
      req.url.match(/\/api\/categories\/([0-9]+)/) &&
      req.method === "DELETE"
    ) {
      const id = req.url.split("/")[3];
      await categoriesCollection.deleteOne({ _id: new ObjectId(id) });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "Category Deleted" }));
      res.end();
    }
    // Get Products
    else if (req.url === "/api/products" && req.method === "GET") {
      const products = await productCollection.find({}).toArray();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(products));
      res.end();
    }
    // Create Product
    else if (req.url === "/api/products" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {
        const product = JSON.parse(body);
        await productCollection.insertOne(product);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(JSON.stringify(product));
        res.end();
      });
    }
    // Get Product
    else if (
      req.url.match(/\/api\/products\/([0-9]+)/) &&
      req.method === "GET"
    ) {
      const id = req.url.split("/")[3];
      const product = await productCollection.findOne({
        _id: new ObjectId(id),
      });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(product));
      res.end();
    }
    // Update Product
    else if (
      req.url.match(/\/api\/products\/([0-9]+)/) &&
      req.method === "PATCH"
    ) {
      const id = req.url.split("/")[3];
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {
        const product = JSON.parse(body);
        await productCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: product }
        );
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Product Updated" }));
        res.end();
      });
    }
    // Delete Product
    else if (
      req.url.match(/\/api\/products\/([0-9]+)/) &&
      req.method === "DELETE"
    ) {
      const id = req.url.split("/")[3];
      await productCollection.deleteOne({ _id: new ObjectId(id) });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "Product Deleted" }));
      res.end();
    }
    // Get Reviews
    else if (req.url === "/api/reviews" && req.method === "GET") {
      const reviews = await reviewsCollection.find({}).toArray();
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(reviews));
      res.end();
    }
    // Create Review
    else if (req.url === "/api/reviews" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {
        const review = JSON.parse(body);
        await reviewsCollection.insertOne(review);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.write(JSON.stringify(review));
        res.end();
      });
    }
    // Get Review
    else if (
      req.url.match(/\/api\/reviews\/([0-9]+)/) &&
      req.method === "GET"
    ) {
      const id = req.url.split("/")[3];
      const review = await reviewsCollection.findOne({
        _id: new ObjectId(id),
      });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(review));
      res.end();
    }
    // Update Review
    else if (
      req.url.match(/\/api\/reviews\/([0-9]+)/) &&
      req.method === "PATCH"
    ) {
      const id = req.url.split("/")[3];
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", async () => {
        const review = JSON.parse(body);
        await reviewsCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: review }
        );
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "Review Updated" }));
        res.end();
      });
    }
    // Delete Review
    else if (
      req.url.match(/\/api\/reviews\/([0-9]+)/) &&
      req.method === "DELETE"
    ) {
      const id = req.url.split("/")[3];
      await reviewsCollection.deleteOne({ _id: new ObjectId(id) });
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "Review Deleted" }));
      res.end();
    }
    // Not Found
    else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.write("<h1>Not Found</h1>");
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
});

const port = 5000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
