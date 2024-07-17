import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import FollowRequest from "./FollowRequest.jsx";
import Navbar from "../home/Navbar.jsx";
import '../../style/Followers.css'; 

const Followers = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

    // Obtener las solicitudes de seguimiento desde el backend
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:3000/follow/requests?userId=${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        console.log("data", data);
        setRequests(data);
        setLoading(false);
        if (data.length === 0) {
          navigate('/'); // Redirige inmediatamente si no hay solicitudes
        }
      } catch (error) {
        console.error("Error obteniendo las solicitudes:", error);
        setError(error);
        setLoading(false);
      }
    };

    useEffect(() => {
    fetchRequests();
  }, [userId, navigate]);

  const handleAccept = async (followerId) => {
    try {
      const response = await fetch("http://localhost:3000/follow/aceptar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followerId, userId }),
      });
      const data = await response.json();
      if (response.ok) {
        setRequests(prevRequests => prevRequests.filter(request => request.follower_id !== followerId));
        console.log(data.message);
        if (requests.length === 1) { // Si esta era la única solicitud, redirigir al inicio
          navigate('/');
        }
      } else {
        console.error("Error aceptando la solicitud:", data.message);
      }
    } catch (error) {
      console.error("Error aceptando la solicitud:", error);
    }
  };

  const handleDeny = async (followerId) => {
    try {
      const response = await fetch("http://localhost:3000/follow/denegar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followerId, userId }),
      });
      const data = await response.json();
      if (response.ok) {
        setRequests(prevRequests => prevRequests.filter(request => request.follower_id !== followerId));
        console.log(data.message);
        if (requests.length === 1) { // Si esta era la única solicitud, redirigir al inicio
          navigate('/');
        }
      } else {
        console.error("Error denegando la solicitud:", data.message);
      }
    } catch (error) {
      console.error("Error denegando la solicitud:", error);
    }
  };

  return (
    <div>
       <Navbar /> 
      {requests.length === 0 ? (
        
        <div className="no-requests-message">No hay solicitudes de seguimiento.</div>
      ) : (
        requests.map((request) => (
          <FollowRequest
            key={request.follower_id}
            follower={request}
            onAccept={handleAccept}
            onDeny={handleDeny}
          />
        ))
      )}
    </div>
  );
};

export default Followers;
