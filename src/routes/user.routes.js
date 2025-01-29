import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller.js";

const userRoutes = async (req, res) => {
    // Get all users
    if (req.url === '/api/users' && req.method === 'GET') {
        const users = await getAllUsers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users));
    }
    // Create a new user
    else if (req.url === '/api/users' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => (body += chunk));
        req.on('end', async () => {
            const user = JSON.parse(body);
            const newUser = await createUser(user);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        });
    }
    // Get user by ID
    else if (req.url && req.url.match(/\/api\/users\/([0-9a-fA-F-]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        const user = await getUserById(id);
        if (user) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    }
    // Update user by ID
    else if (req.url && req.url.match(/\/api\/users\/([0-9a-fA-F-]+)/) && req.method === 'PATCH') {
        const id = req.url.split('/')[3];
        let body = '';
        req.on('data', (chunk) => (body += chunk));
        req.on('end', async () => {
            const updatedData = JSON.parse(body);
            const updatedUser = await updateUser(id, updatedData);
            if (updatedUser) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updatedUser));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User not found' }));
            }
        });
    }
    // Delete user by ID
    else if (req.url && req.url.match(/\/api\/users\/([0-9a-fA-F-]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
        const deletedUser = await deleteUser(id);
        if (deletedUser) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(deletedUser));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    }
}

export { userRoutes };