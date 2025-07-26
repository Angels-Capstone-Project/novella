import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { useTooltip } from "./TooltipContext.jsx";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isWriteOpen, setIsWriteOpen] = useState(false);
  const { showTooltip, updatePosition, hideTooltip } = useTooltip();

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };
  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    try {
      const res = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        // Clear local session info if any
        localStorage.removeItem("userId");

        // Redirect to login
        window.location.href = "/login";
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error during logout", err);
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
      <div
        className="header-left"
        onClick={() => navigate("/home")}
        style={{ cursor: "pointer" }}
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
        onMouseEnter={(e) => showTooltip("Search by title or author", e)}
        onMouseMove={updatePosition}
        onMouseLeave={hideTooltip}
      />

      <div className="write-dropdown">
        <button
          className="dropdown-toggles"
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

      <div className="write-dropdown" ref={dropdownRef}>
        <img
          src="https://via.placeholder.com/30"
          className="profile-icon"
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div className="dropdown-menu">
            <button onClick={handleProfileClick}>Profile </button>
            <button onClick={() => navigate("/library")}>Library</button>
            <button onClick={handleLogout} className="logout">
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
