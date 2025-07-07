import React, { useState, useEffect } from "react";
import "./LibraryPage.css";
import { BASE_URL } from "../utils/api";

const LibraryPage = () => {
  const [tab, setTab] = useState("current");
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [readingLists, setReadingLists] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchLibrary = async () => {
      const res = await fetch(`${BASE_URL}/library/user/${userId}`);
      const data = await res.json();
      setLibraryBooks(data);
    };

    const fetchLists = async () => {
      const res = await fetch(`${BASE_URL}/readinglist/user/${userId}`);
      const data = await res.json();
      setReadingLists(data);
    };

    fetchLibrary();
    fetchLists();
  }, []);

  return (
    <div className="library-page">
      <h1>Library</h1>

      <div className="tabs">
        <button
          className={tab === "current" ? "active" : ""}
          onClick={() => setTab("current")}
        >
          Current Reads
        </button>
        <button
          className={tab === "lists" ? "active" : ""}
          onClick={() => setTab("lists")}
        >
          Reading Lists
        </button>
      </div>

      {tab === "current" && (
        <div className="book-grid">
          {libraryBooks.map((book) => (
            <div className="book-card" key={book.id}>
              <img src={book.story.coverImage} alt={book.story.title} />
              <h4>{book.story.title}</h4>
              <p>{book.story.author}</p>
            </div>
          ))}
        </div>
      )}

      {tab === "lists" && (
        <div className="reading-lists">
          {readingLists.map((list) => (
            <div key={list.id} className="reading-list-item">
              <h3>{list.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
