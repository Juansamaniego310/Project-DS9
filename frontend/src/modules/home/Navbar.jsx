import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../auth/authContex";
import "../../style/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {user, logout} = useAuth();

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  
  const handleLogout = () => {
    logout();
    <Link to="/"></Link>
  };

  return (
    <header className="navbar">
      <nav className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          <img src="/src/assets/logo.webp" alt="ArtScape Logo" />
        </NavLink>

        <div className={`navbar-menu ${menuOpen ? "navbar-menu-show" : ""}`}>
          <ul className="navbar-list">
            <li className="navbar-item">
              <NavLink to="/" className="navbar-link" onClick={handleToggleMenu}>
                Página principal
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/follow" className="navbar-link" onClick={handleToggleMenu}>
                Solicitud de seguidores
              </NavLink>
            </li>
            {/* <li className="navbar-item">
              <NavLink to="/pricing" className="navbar-link" onClick={handleToggleMenu}>
                Pricing
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/blog" className="navbar-link" onClick={handleToggleMenu}>
                Blog
              </NavLink>
            </li> */}
          </ul>
          <div className="navbar-close" onClick={handleToggleMenu}>
            <IoClose />
          </div>
        </div>

        <div>
          {user ? (
            <div className="navbar-profile" onClick={handleToggleDropdown}>
              <div className="navbar-profile-icon">
                <FaUserCircle />
              </div>
              <span className="username">{user.username}</span>
              {dropdownOpen && (
                <div className="navbar-dropdown">
                  <NavLink to="/profile" className="navbar-dropdown-item">
                    Editar Perfil
                  </NavLink>
                  <NavLink to="/subscription" className="navbar-dropdown-item">
                    Suscribirse
                  </NavLink>
                  {/* <NavLink to="/dashboard" className="navbar-dropdown-item">
                    Dashboard
                  </NavLink> */}
                  <div className="navbar-dropdown-item" onClick={handleLogout}>
                    Cerrar sesión
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar-auth-buttons">
              <NavLink to="/login" className="navbar-link auth-link">
                Iniciar sesión
              </NavLink>
              <NavLink to="/register" className="navbar-link auth-link">
                Registrarse
              </NavLink>
            </div>
          )}
        </div>

        <div className="navbar-toggle" onClick={handleToggleMenu}>
          <IoMenu />
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
