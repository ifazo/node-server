import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

// Define file path
const filePath = path.join(process.cwd(), "src", "data", "products.json");

// Generate random products
const generateProducts = (num) => {
  const products = [];

  for (let i = 0; i < num; i++) {
    products.push({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      description: faker.commerce.productDescription(),
    });
  }
  // Write products to products.json
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  return products;
};

// Load products from products.json
const loadProducts = () => {
  if (!fs.existsSync(filePath)) {
    // If file doesn't exist, generate some products
    generateProducts(100);
  } else {
    try {
      // If file exists, read the products
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading or parsing products.json:", error);
      // If there's an error reading or parsing, generate new products
      return generateProducts(100);
    }
  }
};

export { generateProducts, loadProducts };
