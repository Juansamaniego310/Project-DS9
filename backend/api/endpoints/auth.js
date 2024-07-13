import express from 'express';
import supabase from '../../database/connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
  const { user_name, email, password, role } = req.body;

  if (!user_name || !email || !password || !role) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    // Comprobar si el email ya existe en la base de datos
    const { data: existingUser, error: existingUserError } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (existingUserError && existingUserError.code !== 'PGRST116') {
      throw existingUserError;
    }

    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([{ user_name, email, password: hashedPassword, role }]);

    if (error) throw error;

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw error;

    const validPassword = await bcrypt.compare(password, data.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: data.id }, 'tu_secreto_jwt', {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;