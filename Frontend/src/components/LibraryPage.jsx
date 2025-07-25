// LibraryPage.jsx

import React, { useState, useEffect } from "react";
import "./LibraryPage.css";
import { BASE_URL } from "../utils/api";
import Header from "./Header";

const LibraryPage = () => {
  const [tab, setTab] = useState("current");
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [readingLists, setReadingLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newListName, setNewListName] = useState("");
  const userId = localStorage.getItem("userId");

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

  const handleListClick = (listId) => {
    setSelectedListId((prev) => (prev === listId ? null : listId));
  };

  const handleCreateList = async () => {
    if (!newListName.trim()) return;
    const newList = {
      name: newListName,
      coverImage: `https://picsum.photos/200/300?random=${Math.floor(
        Math.random() * 1000
      )}`,
      userId,
    };
    await fetch(`${BASE_URL}/readinglist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newList),
    });
    setNewListName("");
    setShowModal(false);
    fetchLists();
  };

  useEffect(() => {
    fetchLibrary();
    fetchLists();
  }, []);

  return (
    <>
    <Header />
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
        <>
          <button
            className="create-list-btn"
            onClick={() => setShowModal(true)}
          >
            + Create New List
          </button>

          <div className="reading-lists">
            {readingLists.map((list) => (
              <div
                key={list.id}
                className="reading-list-item"
                onClick={() => handleListClick(list.id)}
              >
                <img
                  src={
                    list.coverImage ||
                    `https://picsum.photos/200/300?random=${list.id}`
                  }
                  alt={list.name}
                  className="reading-list-cover"
                />
                <h3>{list.name}</h3>
              </div>
            ))}
          </div>

          {selectedListId && (
            <div
              className="modal-overlay"
              onClick={() => setSelectedListId(null)}
            >
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Reading List Stories</h2>
                <div className="modal-scroll">
                  {readingLists
                    .find((list) => list.id === selectedListId)
                    ?.story?.map((story, index) => {
                      if (!story) {
                        console.warn("Missing story data at index", index);
                        return null;
                      }
                      return (
                        <div className="book-card" key={story.id}>
                          <img src={story.coverImage} alt={story.title} />
                          <h4>{story.title}</h4>
                          <p>By {story.author}</p>
                          <p>{story.description?.slice(0, 100)}...</p>
                          <p>
                            {" "}
                            {story.likedBy?.length || 0} |{" "}
                            {story.readBy?.length || 0}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Create Reading List</h3>
            <input
              type="text"
              placeholder="Enter list name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <button onClick={handleCreateList}>Create</button>
          </div>
        </div>
      )}

      
    </div>
    <footer className="welcome-footer">© 2025 Novella</footer>
    </>
  );
};

export default LibraryPage;
