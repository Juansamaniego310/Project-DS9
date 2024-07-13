import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/Login.css";


function Login() {

  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud de inicio de sesión');
      }

      const data = await response.json();
      console.log(data);
      navigate('/home'); // Redirigir al usuario después del inicio de sesión exitoso
    } catch (error) {
      console.error('Error iniciando sesión:', error);
    }
  };

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
            <Link to="/">
              <button>Registrate</button>
            </Link>
            
        </div>
        <div className="right">
          <h1>Iniciar Sesión</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre de usuario"
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
            <button>Iniciar</button>
          </form>
        </div>
      </div>
    </div>

  );
}

export default Login;
