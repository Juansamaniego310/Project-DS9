import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/Register.css";

const Register = () => {
  const [role, setRole] = useState("");
  const [input, setInputs] = useState({
    user_name: "",
    email: "",
    password: "",
    confirmPass: "",
    terms: false,
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRole = (e) => {
    setRole(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs({
      ...input,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (input.password !== input.confirmPass) {
      alert("La Contraseña no coincide");
      return;
    }

    if (!input.terms) {
      alert("Debes aceptar los términos de condiciones");
      return;
    }

    try {
      console.log(input.user_name, input.email, input.password, role);
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: input.user_name,
          email: input.email,
          password: input.password,
          role: role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error registrando usuario');
      }

      const data = await response.json();
      console.log(data);
      navigate('/login');
    } catch (error) {
      console.error('Error registrando usuario:', error);
      setError(error.message);
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>ArtScape</h1>
          <p>
            Bienvenido al portal de la imaginación. <br />¡Suelta tus ideas y
            crea maravillas!
          </p>
          <span>Ya tienes una cuenta?</span>
          <Link to="/login">
            <button>Iniciar sesión</button>
          </Link>
        </div>
        <div className="right">
          <h1>Registro</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="user_name"
              placeholder="Nombre de usuario"
              value={input.user_name}
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

            <input
              type="password"
              placeholder="Confirmar Contraseña"
              name="confirmPass"
              value={input.confirmPass}
              onChange={handleChange}
            />

            <label>
              <input
                type="checkbox"
                name="terms"
                checked={input.terms}
                onChange={handleChange}
              />
              Acepto los términos y condiciones
            </label>

            <select value={role} onChange={handleRole} name="role">
              <option value="">Tipo de Usuario</option>
              <option value="artista">Artista</option>
              <option value="empresa">Empresa</option>
            </select>

            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
