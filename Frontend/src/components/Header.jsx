import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isWriteOpen, setIsWriteOpen] = useState(false);

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

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
      <div className="header-left"
        onClick={()=>navigate("/home")}
        style={{cursor:"pointer"}}
        >
        Novella
        </div>
      <input
        type="text"
        placeholder="Search by title or author..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleSearch}
        className="search-input"
      />

      <div className="write-dropdown">
        <button
          className="dropdown-toggle"
          onClick={() => setIsWriteOpen(!isWriteOpen)}
        >
          Write ⌄
        </button>
        {isWriteOpen && (
          <div className="dropdown-menu">
            <button onClick={() => navigate("/write/new")}>
              Create a New Story
            </button>
            <button onClick={() => navigate("/my-stories")}>My Stories</button>
          </div>
        )}
      </div>

      <div className="header-right" ref={dropdownRef}>
        <img
          src="https://via.placeholder.com/30"
          className="profile-icon"
          onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && (
          <div className="dropdown-menu">
            <button>Inbox</button>
            <button>Notifications </button>
            <button onClick={() => navigate("/library")}>Library</button>
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
