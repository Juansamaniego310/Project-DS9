import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import '../../style/Home.css';
import Post from "../posts/Post";

const Home = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/posts/recentposts`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error fetching recent posts");
        }
        const data = await response.json();
        setRecentPosts(data);
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      }
    };

    fetchRecentPosts();
  }, []);

  return (
    <div className="home">
      <Navbar />
      <div className="welcome-section">
        <h1>Bienvenido a <br/> ArtScape</h1>
        <p>Conecta y colabora con miles de artistas</p>
        <Link to="/register">
          <button>Comenzar</button>
        </Link>
      </div>
      <section className="recent-posts-section">
        <div className="section-header">
          <h2>Últimos posts</h2>
          <p>Comparte tu arte y date a conocer</p>
          <Link to="/posts">
            <button className="view-all-posts-button">Ver todos los posts</button>
          </Link>
        </div>
        <div className="posts-container">
          {recentPosts.map((post) => (
            <Post
              key={post.id}
              title={post.title}
              image={post.post_img}
              content={post.content}
              date={post.publish_date}
              userName={post.user_name}
            />
          ))}
        </div>
      </section>
      <div className="popular-themes-section">
        <h2>Temas populares</h2>
        <p>Explora muchos temas sobre diseño y arte</p>
        <Link to="/explore">
          <button>Explorar</button>
        </Link>
      </div>
      <p>2024 ArtScape. Todos los derechos reservados</p>
    </div>
  );
};

export default Home;
