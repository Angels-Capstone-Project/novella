import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">Novella</div>
      <div className="header-right">
        <img
          src="https://via.placeholder.com/30"
          alt="Profile"
          className="profile-icon"
        />
      </div>
    </header>
  );
};

export default Header;
