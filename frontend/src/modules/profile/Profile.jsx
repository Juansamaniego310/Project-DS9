// Profile.jsx
import "../../style/Profile.css";
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Navbar from "../home/Navbar.jsx";
import { useAuth } from "../auth/authContex.jsx";
import UserPosts from "../posts/Userposts.jsx"; // Importar el nuevo componente

Modal.setAppElement("#root");

const Profile = () => {
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [perfil, setProfile] = useState({});
  // modal
  const [modalSelect, setModalSelect] = useState(false);

  // editar perfil
  const [bio, setBio] = useState("");
  const [imagen, setImagen] = useState(null);
  const [previewImg, setPreviewImg] = useState("");

  // extraer el usuario id
  const { user } = useAuth();
  const userId = user.id;

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [followerResponse, postResponse, followingResponse] =
          await Promise.all([
            fetch(
              `http://localhost:3000/follow/followers/count?userId=${userId}`
            ),
            fetch(`http://localhost:3000/posts/posts/count?userId=${userId}`),
            fetch(
              `http://localhost:3000/follow/following/count?userId=${userId}`
            ),
          ]);

        const followerData = await followerResponse.json();
        const postData = await postResponse.json();
        const followingData = await followingResponse.json();

        setFollowerCount(followerData.count);
        setPostCount(postData.count);
        setFollowingCount(followingData.count);
        setLoading(false);
      } catch (error) {
        console.error("Error obteniendo los contadores:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchCounts();
  }, [userId]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/profile/profile?userId=${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error obteniendo el usuario");
        }

        const data = await response.json();
        setProfile(data);
        setBio(data.biography || "");
        setPreviewImg(data.perfil_img || "");
      } catch (error) {
        console.error("Error obteniendo el perfil:", error);
      }
    };

    fetchProfile();
  }, [userId]);

  const abrirModal = () => {
    // preparación del modal con los datos actuales del perfil o vacio si no existen
    setBio(perfil.biography || "");
    setPreviewImg(perfil.perfil_img || "");
    setModalSelect(true);
  };
  const cerrarModal = () => setModalSelect(false);

  const handleFile = (e) => {
    const file = e.target.files[0];
    setImagen(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageBase64 = previewImg;

      const response = await fetch(`http://localhost:3000/profile/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          biography: bio,
          perfil_img: imageBase64,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error actualizando al usuario");
      }

      const updateProfile = await response.json();
      setProfile(updateProfile[0]);
      setBio(updateProfile[0].biography);
      setPreviewImg(updateProfile[0].perfil_img);
      cerrarModal();
    } catch (error) {
      console.error("Error actualizando el perfil:", error);
    }
  };

  return (
    <div className="profile">
      <Navbar />
      <div className="profile-header">
        <p>
          {previewImg ? (
            <img
              src={previewImg}
              alt="Imagen de perfil"
              style={{ width: "100px", height: "100px" }}
            />
          ) : (
            "Aún no hay imagen de perfil"
          )}
        </p>
        <h2>{perfil.name}</h2>
        <p>
          {perfil.biography ||
            "No hay biografía, por favor actualiza tus datos"}
        </p>
        <button className="follow-button" onClick={abrirModal}>
          Editar Perfil
        </button>
      </div>

      <Modal
        isOpen={modalSelect}
        onRequestClose={cerrarModal}
        contentLabel="Editar Perfil"
        className="ReactModal__Content"
        overlayClassName="ReactModal__Overlay"
      >
        <h2>Editar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Biografía:
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </label>
          <label>
            Imagen de perfil:
            <input type="file" onChange={handleFile} />
            {previewImg && (
              <img
                src={previewImg}
                alt="Preview"
                style={{ width: "100px", height: "100px" }}
              />
            )}
          </label>
          <div className="modal-buttons">
            <button type="submit" className="save-button">
              Guardar
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={cerrarModal}
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal>

      <div className="profile-stats">
        <div className="stats">
          <h3>{postCount}</h3>
          <p>Post</p>
        </div>

        <div className="stats">
          <h3>{followerCount}</h3>
          <p>Seguidores</p>
        </div>

        <div className="stats">
          <h3>{followingCount}</h3>
          <p>Siguiendo</p>
        </div>
      </div>
      <div className="filter-buttons">
        <button className="filter-all">All</button>
        <button className="filter">Ilustration</button>
        <button className="filter">Design</button>
        <button className="filter">Motion</button>
      </div>

      {/* Agregar los posts del usuario */}
      <UserPosts userId={userId} />
    </div>
  );
};

export default Profile;
