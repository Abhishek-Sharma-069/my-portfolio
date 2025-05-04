import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const activeStyle = "text-purple-500";
  const normalStyle = "hover:text-purple-500 transition-colors";

  return (
    <div className="max-w-full h-16 bg-black flex gap-2 justify-center items-center fixed top-0 w-full z-50">
      <div className="w-[33%] bg-purple-600 h-[3px] rounded-md"></div>

      <ul className="flex gap-8 text-white text-2xl">
        <li>
          <NavLink to="/" className={({ isActive }) => isActive ? activeStyle : normalStyle}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => isActive ? activeStyle : normalStyle}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" className={({ isActive }) => isActive ? activeStyle : normalStyle}>
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/skills" className={({ isActive }) => isActive ? activeStyle : normalStyle}>
            Skills
          </NavLink>
        </li>
        <li>
          <NavLink to="/experience" className={({ isActive }) => isActive ? activeStyle : normalStyle}>
            Experience
          </NavLink>
        </li>
        <li>
          <NavLink to="/resume" className={({ isActive }) => isActive ? activeStyle : normalStyle}>
            Resume
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => isActive ? activeStyle : normalStyle}>
            Contact
          </NavLink>
        </li>
      </ul>

      <div className="w-[33%] bg-purple-600 h-[3px] rounded-md"></div>
    </div>
  );
};

export default Navbar;
