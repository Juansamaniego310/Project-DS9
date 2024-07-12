import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const api = express();
const PORT = process.env.PORT ?? 3000;

api.use(express.json());
api.use(cors());

// Middleware para servir archivos estáticos desde la raíz del proyecto
api.use(express.static(path.join(__dirname, '../../frontend')));

api.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});