import express from "express";
import supabase from "../../database/connection.js";

const router = express.Router();

// Obtener los posts de un usuario específico
router.get("/userposts", async (req, res) => {
  const userId = req.query.userId;

  try {
    const { data, error } = await supabase
      .from("post")
      .select("*")
      .eq("id_user", userId);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener todos los posts
router.get("/posts", async (req, res) => {
  try {
    const { data: posts, error: postsError } = await supabase
      .from("post")
      .select("*");

    if (postsError) {
      throw postsError;
    }

    // Obtener todos los usuarios
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, user_name");

    if (usersError) {
      throw usersError;
    }

    // Mapear los posts con el nombre de usuario correspondiente
    const postsWithUserNames = posts.map((post) => {
      const user = users.find((user) => user.id === post.id_user);
      return {
        ...post,
        user_name: user ? user.user_name : "Unknown User",
      };
    });

    res.status(200).json(postsWithUserNames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo post
router.post("/newposts", async (req, res) => {
    const { userId, title, content, post_img } = req.body;
  
    try {
      const { data, error } = await supabase
        .from("post")
        .insert([
          {
            id_user: userId,
            title,
            content,
            post_img,
            publish_date: new Date().toISOString(),
          },
        ]);
  
      if (error) throw error;

      // Obtener el nombre de usuario correspondiente al userId
    const { user_name } = await supabase
        .from("users")
        .select("user_name")
        .eq("id", userId)
        .single();

    const newPost = {
        ...data[0],
        user_name: user.user_name, // Agregar el nombre de usuario al nuevo post creado
    };

  
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  

export default router;