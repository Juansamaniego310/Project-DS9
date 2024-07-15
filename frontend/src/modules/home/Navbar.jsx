import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../auth/authContex";
import "../../style/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {user} = useAuth();

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  console.log(user.username)
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
                Home
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/products" className="navbar-link" onClick={handleToggleMenu}>
                Products
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/pricing" className="navbar-link" onClick={handleToggleMenu}>
                Pricing
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink to="/blog" className="navbar-link" onClick={handleToggleMenu}>
                Blog
              </NavLink>
            </li>
          </ul>
          <div className="navbar-close" onClick={handleToggleMenu}>
            <IoClose />
          </div>
        </div>

        <div>
          {user ? (
            <div className="navbar-profile" onClick={handleToggleDropdown}>
              {user.username}
              {dropdownOpen && (
                <div className="navbar-dropdown">
                  <NavLink to="/profile" className="navbar-dropdown-item">
                    Profile
                  </NavLink>
                  <NavLink to="/account" className="navbar-dropdown-item">
                    Account
                  </NavLink>
                  <NavLink to="/dashboard" className="navbar-dropdown-item">
                    Dashboard
                  </NavLink>
                  <NavLink to="/logout" className="navbar-dropdown-item">
                    Logout
                  </NavLink>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar-auth-buttons">
              <NavLink to="/login" className="navbar-link">
                Iniciar sesión
              </NavLink>
              <NavLink to="/register" className="navbar-link">
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
