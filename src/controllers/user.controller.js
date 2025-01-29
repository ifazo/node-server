import { loadUsers } from "../models/user.model.js";
import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

// Define file path
const filePath = path.join(process.cwd(), "src", "data", "users.json");

// Get all users
const getAllUsers = async () => {
  return loadUsers();
};

// Get user by ID
const getUserById = async (id) => {
  const users = loadUsers();
  return users.find((user) => user.id === id);
};

// Create a new user
const createUser = async (user) => {
  const users = loadUsers();
  const newUser = { id: faker.string.uuid(), ...user };
  users.push(newUser);

  // Save to users.json
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  return newUser;
};

// Update an existing user
const updateUser = async (id, updatedUser) => {
  const users = loadUsers();
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    return users[index];
  }
  return null;
};

// Delete a user
const deleteUser = async (id) => {
  let users = loadUsers();
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    const deletedUser = users.splice(index, 1);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    return deletedUser[0];
  }
  return null;
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
