import React from 'react';
import '../../style/FollowRequest.css'; // Crea un archivo CSS correspondiente para estilos
import Navbar from "../home/Navbar.jsx";

const FollowRequest = ({ follower, onAccept, onDeny }) => {
  return (
    <div>
        <Navbar />
    <div className="follow-request">
      <div className="follower-info">
        <img src={follower.profile.perfil_img} alt="Profile" className="profile-img" />
        <div>
          <h3>{follower.profile.name}</h3>
          <p>{follower.profile.biography}</p>
        </div>
      </div>
      <div className="actions">
        <button onClick={() => onAccept(follower.follower_id)} className="accept-button">Aceptar</button>
        <button onClick={() => onDeny(follower.follower_id)} className="deny-button">Denegar</button>
      </div>
    </div>
    </div>
  );
};

export default FollowRequest;
