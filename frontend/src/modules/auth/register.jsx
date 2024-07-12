import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";


const Register = () => {
  const [userType, setUserType] = useState("");
  const [input, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    userType: "",
  });

  const handleUserType = (e) => {
    setUserType(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to API
  };
  

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>ArtScape</h1>
          <p>
            Bienvenido al portal de la imaginación. <br></br>¡Suelta tus ideas y
            crea maravillas!
          </p>
        </div>
        <div className="right">
          <h1>Registro</h1>
          <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre de usuario"
                value={input.nombre}
                onChange={handleChange}
              />

              <input
                type="email"
                placeholder="Correo"
                name="email"
                value={input.email}
                onChange={handleChange}
              />
  
              <input
                type="password"
                placeholder="Contraseña"
                name="password"
                value={input.password}
                onChange={handleChange}
              />

              <select value={userType} onChange={handleUserType}>
                <option value="">Tipo de Usuario</option>
                <option value="artista">Artista</option>
                <option value="empresa">Empresa</option>
              </select>

            {/* {userType === 'artista' && (
      <label>
        Especialidad:
        <input
          type="text"
          name="especialidad"
          value={input.especialidad}
          onChange={handleChange}
        />
      </label>
    )}

    {userType === 'empresa' && (
      <label>
        Nombre de la Empresa:
        <input
          type="text"
          name="nombreEmpresa"
          value={input.nombreEmpresa}
          onChange={handleChange}
        />
      </label>
    )} */}

            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
