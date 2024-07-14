import express from "express";
import supabase from "../../database/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

//perfil del usuario
router.get("/profile:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Comprobar si el email ya existe en la base de datos
    const { data: profile, profileError } = await supabase
      .from('profile')
      .select('*')
      .eq('id_user', userId)
      .single();

    if (profileError) throw profileError;

    const { data: followers, error: followersError } = await supabase
      .from('followers')
      .select('following_user', 'followers_user')
      .eq('id_user', userId)
      .single();

      if (followersError) throw followersError;

    const { data: posts, error: postsError } = await supabase
      .from('post')
      .select('*')
      .eq('id_user', userId);

      if (postsError) throw postsError;

    const profileData = {
        nombre: profile.name,
        biografia: profile.biography,
        imagen: profile.profile_img,
        seguidores: followers.followers_user,
        siguiendo: followers.following_user,
        post: posts.length,
        publicaciones: posts.map(post => ({
            id: post.id,
            imagen_url: post.post_img,
            titulo: post.title
          }))
    };

    res.json(profileData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;