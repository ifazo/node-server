import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";

// Define file path
const filePath = path.join(process.cwd(), "src", "data", "users.json");

// Generate random users
const generateUsers = (num) => {
  const users = [];

  for (let i = 0; i < num; i++) {
    users.push({
      id: faker.string.uuid(),
      avatar: faker.image.avatar(),
      birthday: faker.date.birthdate(),
      email: faker.internet.email(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      sex: faker.person.sexType(),
      subscriptionTier: faker.helpers.arrayElement(["free", "basic", "premium"]),
    });
  }
  // Write users to users.json
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  return users;
};

// Load users from users.json
const loadUsers = () => {
  if (!fs.existsSync(filePath)) {
    // If file doesn't exist, generate some users
    generateUsers(100);
  } else {
    try {
      // If file exists, read the users
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.error("Error reading or parsing users.json:", error);
      // If there's an error reading or parsing, generate new users
      return generateUsers(100);
    }
  }
}

export { generateUsers, loadUsers };