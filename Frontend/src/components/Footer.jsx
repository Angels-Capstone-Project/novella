import React from "react";
import { FaHome, FaSearch, FaPen, FaBell } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <FaHome />
      <FaSearch />
      <FaPen />
      <FaBell />
    </footer>
  );
};

export default Footer;
