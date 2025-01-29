import { loadProducts } from "../models/product.model.js";
import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

// Define file path
const filePath = path.join(process.cwd(), "src", "data", "products.json");

// Get all products
const getAllProducts = async () => {
  return loadProducts();
};

// Get product by ID
const getProductById = async (id) => {
  const products = loadProducts();
  return products.find((product) => product.id === id);
};

// Create a new product
const createProduct = async (product) => {
  const products = loadProducts();
  const newProduct = { id: faker.string.uuid(), ...product };
  products.push(newProduct);

  // Save to products.json
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  return newProduct;
};

// Update an existing product
const updateProduct = async (id, updatedProduct) => {
  const products = loadProducts();
  const index = products.findIndex((product) => product.id === id);

  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    return products[index];
  }
  return null;
};

// Delete a product
const deleteProduct = async (id) => {
  let products = loadProducts();
  const index = products.findIndex((product) => product.id === id);

  if (index !== -1) {
    const deletedProduct = products.splice(index, 1);
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
    return deletedProduct[0];
  }
  return null;
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
