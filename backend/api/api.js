import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import routeauth from './endpoints/auth.js';
import routeprofile from './endpoints/profile.js'
import routefollow from './endpoints/follow.js'

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const api = express();
const PORT = process.env.PORT ?? 3000;

api.use(express.json({limit: '10mb'}));
api.use(cors({
    origin: 'http://localhost:5173' // Asegúrate de que esto coincide con tu origen frontend
  }));

// Middleware para servir archivos estáticos desde la raíz del proyecto
api.use(express.static(path.join(__dirname, '../../frontend')));

api.use('/auth', routeauth);
api.use('/profile', routeprofile);
api.use('/follow', routefollow);

api.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});