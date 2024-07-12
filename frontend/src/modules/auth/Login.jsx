import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";


function Login() {
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>ArtScape</h1>
          <p>
            Bienvenido al portal de la imaginación. <br>
            </br>¡Suelta tus ideas y crea maravillas!
          </p>
          <span>No tienes una cuenta?</span>
            <button>Registrate</button>
        </div>
        <div className="right">
          <h1>Iniciar Sesión</h1>
          <form>
            <input
              type="text"
              placeholder="Nombre de usuario"
              name="username"
            />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
            />
            <button>Iniciar</button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default Login;
