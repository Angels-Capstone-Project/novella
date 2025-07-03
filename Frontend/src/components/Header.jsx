import React, { useState, useRef, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-left">Novella</div>

      <div className="header-right" ref={dropdownRef}>
        <img
          src="https://via.placeholder.com/30"
          // alt="Profil"
          className="profile-icon"
          onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && (
          <div className="dropdown-menu">
            <button>Inbox</button>
            <button >Notifications </button>
            <button>Library</button>
            <button>Language: English</button>
            <button>Help</button>
            <button>Settings</button>
            <button className="logout">Log Out</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
