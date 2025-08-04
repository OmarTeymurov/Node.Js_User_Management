import { readFileSync, writeFileSync } from "fs";
import path from "path";

const usersFilePath = path.resolve("./data/users.json");

const readUsersFromFile = () => {
  const data = readFileSync(usersFilePath);
  return JSON.parse(data);
};

const writeUsersToFile = (users) => {
  writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

export { readUsersFromFile, writeUsersToFile };
