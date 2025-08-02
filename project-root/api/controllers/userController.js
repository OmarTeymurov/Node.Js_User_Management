import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersFilePath = path.join(__dirname, '../data/users.json');


const readUsersFromFile = () => {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
};


const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

export const getUsers = (req, res) => {
    const users = readUsersFromFile();
    res.status(200).json(users);
};

export const getUserById = (req, res) => {
    const users = readUsersFromFile();
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
        return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    }
    res.status(200).json(user);
};

export const createUser = (req, res) => {
    const users = readUsersFromFile();
    const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };
    users.push(newUser);
    writeUsersToFile(users);
    res.status(201).json(newUser);
};


export const updateUser = (req, res) => {
    let users = readUsersFromFile();
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) {
        return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    }
    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;
    writeUsersToFile(users);
    res.status(200).json(updatedUser);
};


export const deleteUser = (req, res) => {
    let users = readUsersFromFile();
    const initialLength = users.length;
    const filteredUsers = users.filter(u => u.id !== parseInt(req.params.id));
    if (initialLength === filteredUsers.length) {
         return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
    }
    writeUsersToFile(filteredUsers);
    res.status(200).json({ message: 'İstifadəçi uğurla silindi' });
};