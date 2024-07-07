import express, { json } from 'express';
import cors from 'cors';
import path from 'path';

const api = express();
const PORT = process.env.PORT ?? 3000;

api.use(json());
api.use(cors());

// Middleware para servir archivos estáticos desde la raíz del proyecto
api.use(express.static(path.join(__dirname, '../')));

// Pseudo-base de datos
let ingresos = [];
let egresos = [];

api.use(express.json());
api.use(cors());


api.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
