import "../../style/Profile.css";
import React, { useState, useEffect } from "react";

const Profile = () => {
  const [perfil, setProfile] = useState({});
  // extraer el usuario ide del localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;
  console.log("ID del usuario:", userId);

  // const userId = localStorage.getItem('id');

  useEffect(() => {
    const fetchProfile = async () => {
      console.log("entrando al try");
      try {
        const response = await fetch(`http://localhost:3000/profile/profile?userId=${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error obteniendo el usuario");
        }

        const data = await response.json();
        console.log(data);
        setProfile(data);
      } catch (error) {
        console.error("Error obteniendo el perfil:", error);
      }
    };

    fetchProfile();
  }, [userId]);

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>Perfil de usuario</h1>
        <p>
          {" "}
          Imagen de perfil: {perfil.perfil_img || "Aún no hay imagen de perfil"}
        </p>
        {/* <img className="profile-image" src={profile.perfil_img} alt="Profile" /> */}
        <h2>Nombre: {perfil.name}</h2>
        <p>
          {perfil.biography ||
            "No hay biografía, por favor actualiza tus datos"}
        </p>
        <button className="follow-button">Edit Profile</button>
      </div>
      {/* <div className="profile-stats">
        <div className="stats">
          <span>{profileData.post}</span> AQUI HAY QUE CONSUMIR EL POST QUE VIENE VACIO Y DEBE INCREMENTAR A MEDIDA QUE EL USUARIO PUBLIQUE
          <p>Post</p>
        </div>
        <div className="stats">
          <span>{profileData.seguidores}</span> AQUI HAY QUE CONSUMIR LOS SEGUIDORES QUE VIENE VACIO Y DEBE INCREMENTAR A MEDIDA QUE EL USUARIO SIGA
          <p>Followers</p>
        </div>
        <div className="stats">
          <span>{profileData.siguiendo}</span> AQUI HAY QUE CONSUMIR LOS SEGUIDORES QUE VIENE VACIO Y DEBE INCREMENTAR A MEDIDA QUE EL USUARIO SIGA
          <p>Following</p>
        </div>
      </div>
      <div className="filter-buttons">
        <button className="filter-all">All</button>
        <button className="filter">Ilustration</button>
        <button className="filter">Design</button>
        <button className="filter">Motion</button>
      </div> 
      <div className="gallery">                     AQUI HAY QUE CONSUMIR LOS POST QUE VIENE VACIO Y DEBE INCREMENTAR A MEDIDA QUE EL USUARIO PUBLIQUE
        {profileData.publicaciones.map((post) => (
          <img key={post.id} src={post.imagen_url} alt={post.titulo} />
        ))}
      </div> */}
    </div>
  );
};

export default Profile;
