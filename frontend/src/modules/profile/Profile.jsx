import "../../style/Profile.css";
import React, { useState, useEffect } from "react";
//import { fetchProfileData } from "../../../../backend/api/endpoints/profile.js";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      fetchProfile(user.id);
    }
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const response = await fetch(`/api/profile/${userId}`);
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error("Error extrayendo la data", error);
    }
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <img className="profile-image" src={profileData.imagen} alt="Profile" />
        <h2>{profileData.nombre}</h2>
        <p>{profileData.biografia}</p>
        <button className="follow-button">Edit Profile</button>
      </div>
      <div className="profile-stats">
        <div className="stats">
          <span>{profileData.post}</span>
          <p>Post</p>
        </div>
        <div className="stats">
          <span>{profileData.seguidores}</span>
          <p>Followers</p>
        </div>
        <div className="stats">
          <span>{profileData.siguiendo}</span>
          <p>Following</p>
        </div>
      </div>
      <div className="filter-buttons">
        <button className="filter-all">All</button>
        <button className="filter">Ilustration</button>
        <button className="filter">Design</button>
        <button className="filter">Motion</button>
      </div>
      <div className="gallery">
        {profileData.publicaciones.map((post) => (
          <img key={post.id} src={post.imagen_url} alt={post.titulo} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
