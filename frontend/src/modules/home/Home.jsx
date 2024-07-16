import React from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import '../../style/Home.css';

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="home">
      <Navbar />
       
       <div>
          <h1>Bienvenido a <br/> ArtScape</h1>
          <p>Conecta y colabora con miles de artistas</p>
          <Link to="/register">
            <button>Comenzar</button>
          </Link>
        </div>

      <section>
        <div>
          <h2>Ultimos posts</h2>
          <p>Comparte tu arte y date a conocer</p>
          <Link to="posts">
            <button>Ver todos los posts</button>
          </Link>
        </div>
      </section>

      <div>
        <h2>Temas populares</h2>
        <p>Explora muchos temas sobre diseño y arte</p>
        <Link>
          <button>Explorar</button>
        </Link>
      </div>

      <p>2024 ArtScape. Todos los derechos reservados</p>
    </div>
  );
};

export default Home;
