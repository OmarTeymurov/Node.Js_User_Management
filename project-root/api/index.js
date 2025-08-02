import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import userRoutes from './routes/userRoutes.js';

const PORT = process.env.PORT || 5050;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {

    const frontendBuildPath = path.join(__dirname, '../frontend/build');

    app.use(express.static(frontendBuildPath));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(frontendBuildPath, 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`✅ Backend server http://localhost:${PORT} ünvanında işləyir`);
});