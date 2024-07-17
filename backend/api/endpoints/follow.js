import express from "express";
import supabase from "../../database/connection.js";

const router = express.Router();

// Endpoint para obtener solicitudes de seguimiento pendientes
router.get("/requests", async (req, res) => {
  const { userId } = req.query;

  try {
    const { data, error } = await supabase
      .from("follow_requests")
      .select(
        `
      follower_id,
      profile (
        *
      )
    `
      )
      .eq("following_id", userId);

    console.log(data);

    if (error) {
      throw error;
    }

    const followerIds = data.map((request) => request.follower_id);
    const { data: followers, error: followersError } = await supabase
      .from("profile")
      .select("id_user, name, biography, perfil_img")
      .in("id", followerIds);

    if (followersError) {
      throw followersError;
    }

    const requestsWithFollowerInfo = data.map((request) => ({
      ...request,
      follower: followers.find(
        (follower) => follower.id === request.follower_id
      ),
    }));

    res.status(200).send(requestsWithFollowerInfo);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Endpoint para aceptar una solicitud de seguimiento
router.post("/aceptar", async (req, res) => {
  const { followerId, userId } = req.body;

  console.log("Received request to accept follow:", { followerId, userId });

  try {
    const { data, error } = await supabase
      .from("followers")
      .insert([
        { following_id: Number(userId), follower_id: Number(followerId) },
      ]);

    if (error) {
      throw error;
    }

    // Eliminar la solicitud de seguimiento aceptada de la tabla follow_requests
    const { error: deleteError } = await supabase
      .from("follow_requests")
      .delete()
      .match({ follower_id: Number(followerId), following_id: Number(userId) });

    if (deleteError) {
      throw deleteError;
    }

    res
      .status(200)
      .send({
        message: "Solicitud aceptada y eliminada de la base de datos",
        data,
      });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Endpoint para denegar una solicitud de seguimiento
router.post("/denegar", async (req, res) => {
  const { followerId, userId } = req.body;

  try {
    // Eliminar la solicitud de seguimiento denegada de la tabla follow_requests
    const { data, error } = await supabase
      .from("follow_requests")
      .delete()
      .match({ following_id: Number(followerId), follower_id: Number(userId) });

    if (error) {
      throw error;
    }

    res.status(200).send({ message: "Solicitud denegada", data });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Endpoint para obtener la cantidad de seguidores
router.get("/followers/count", async (req, res) => {
  const { userId } = req.query;

  try {
    const { count, error } = await supabase
      .from("followers")
      .select("id", { count: "exact" })
      .eq("following_id", Number(userId));

    if (error) {
      throw error;
    }

    res.status(200).send({ count });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Endpoint para obtener la cantidad de personas que sigo
router.get("/following/count", async (req, res) => {
  const { userId } = req.query;

  try {
    const { count, error } = await supabase
      .from("followers")
      .select("id", { count: 'exact' })
      .eq("follower_id", Number(userId));

    if (error) {
      throw error;
    }

    res.status(200).send({ count });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

export default router;
