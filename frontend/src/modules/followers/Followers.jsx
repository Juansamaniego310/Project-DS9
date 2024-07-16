import React, { useState, useEffect } from "react";
import FollowRequest from "./FollowRequest.jsx";
import Navbar from "../home/Navbar.jsx";
import '../../style/Followers.css'; 

const Followers = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  useEffect(() => {
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
      } catch (error) {
        console.error("Error obteniendo las solicitudes:", error);
      }
    };

    fetchRequests();
  }, [userId]);

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
      setRequests(
        requests.filter((request) => request.follower_id !== followerId)
      );
      console.log(data.message);
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
      setRequests(
        requests.filter((request) => request.follower_id !== followerId)
      );
      console.log(data.message);
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
