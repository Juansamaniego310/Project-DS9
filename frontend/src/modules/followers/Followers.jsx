import React, { useState, useEffect } from 'react';
import FollowRequest from './FollowRequest.jsx';


const Followers = () => {
  const [requests, setRequests] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.id;

  useEffect(() => {
    // Obtener las solicitudes de seguimiento desde el backend
    const fetchRequests = async () => {
      try {
        const response = await fetch(`http://localhost:3000/follow/requests?userId=${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log('data', data);
        setRequests(data);
      } catch (error) {
        console.error("Error obteniendo las solicitudes:", error);
      }
    };

    fetchRequests();
  }, [userId]);

  // const handleAccept = async (followerId) => {
  //   try {
  //     const response = await fetch('http://localhost:3000/follow/aceptar', {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ followerId, userId }),
  //     });
  //     const data = await response.json();
  //     setRequests(requests.filter(request => request.id !== followerId));
  //     console.log(data.message);
  //   } catch (error) {
  //     console.error("Error aceptando la solicitud:", error);
  //   }
  // };

  // const handleDeny = async (followerId) => {
  //   try {
  //     const response = await fetch('/follow/denegar', {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ followerId, userId }),
  //     });
  //     const data = await response.json();
  //     setRequests(requests.filter(request => request.id !== followerId));
  //     console.log(data.message);
  //   } catch (error) {
  //     console.error("Error denegando la solicitud:", error);
  //   }
  // };

  return (
    <div>
      {requests.map(request => (
        <FollowRequest
          key={request.id}
          follower={request}
          // onAccept={handleAccept}
          // onDeny={handleDeny}
        />
      ))}
    </div>
  );
};

export default Followers;