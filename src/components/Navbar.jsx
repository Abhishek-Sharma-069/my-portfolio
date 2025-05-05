import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeStyle = "text-purple-500";
  const normalStyle = "hover:text-purple-500 transition-colors";

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/skills", label: "Skills" },
    { to: "/experience", label: "Experience" },
    { to: "/resume", label: "Resume" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="max-w-full h-16 bg-black flex justify-between items-center fixed top-0 w-full z-50 px-4">
      <div className="w-[33%] bg-purple-600 h-[3px] rounded-md hidden sm:block"></div>
      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-8 text-white text-2xl ml-1 mr-1">
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to} className={({ isActive }) => isActive ? activeStyle : normalStyle}>
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
      {/* Hamburger Icon */}
      <button
        className="sm:hidden text-white text-3xl focus:outline-none"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
      <div className="w-[33%] bg-purple-600 h-[3px] rounded-md hidden sm:block"></div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-16 left-0 w-full bg-black bg-opacity-95 flex flex-col items-center z-50 sm:hidden animate-fade-in" style={{height: 'auto', minHeight: 'calc(100vh * 0.5)'}}>
          <ul className="flex flex-col gap-6 py-8 text-white text-2xl w-full items-center">
            {navLinks.map((link) => (
              <li key={link.to} className="w-full text-center">
                <NavLink
                  to={link.to}
                  className={({ isActive }) => isActive ? activeStyle : normalStyle}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Overlay to close menu when clicking outside */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 sm:hidden"
          style={{ background: 'rgba(0,0,0,0.2)' }}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
