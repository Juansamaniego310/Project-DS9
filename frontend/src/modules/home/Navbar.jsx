import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import "../../style/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleToggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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

        <div className="navbar-profile" onClick={handleToggleDropdown}>
          <FaUserCircle />
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

        <div className="navbar-toggle" onClick={handleToggleMenu}>
          <IoMenu />
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
