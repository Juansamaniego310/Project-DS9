import express from "express";
import supabase from '../../database/connection.js';

const router = express.Router();

//endpoint para obtener el id_user del usuario logeado
router.get('/profile', async (req, res) => {
  const userId  = req.query.userId; 

  try {
    const { data, error } = await supabase
      .from('profile')
      .select('*')
      .eq('id_user', userId)
      .single();

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//actualizar los campos de biografia y imagen de perfil para el usuario logeado
router.put('/profile', async(req, res) =>{
  const{ userId, biography, perfil_img } = req.body;

  try{
    const {data, error } = await supabase
      .from('profile')
      .update({ biography, perfil_img})
      .eq('id_user', userId);

      if (error) throw error;

      res.status(200).json({ message: 'Perfil actualizado'});
  }catch(error){
    res.status(500).json({ error: error.message });
  }
});


export default router;