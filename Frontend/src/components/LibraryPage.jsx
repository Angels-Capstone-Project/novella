import React, { useState, useEffect } from "react";
import "./LibraryPage.css";
import { BASE_URL } from "../utils/api";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LibraryPage = ({ setLoading }) => {
  const [tab, setTab] = useState("current");
  const [libraryBooks, setLibraryBooks] = useState([]);
  const [readingLists, setReadingLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newListName, setNewListName] = useState("");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const fetchLibrary = async () => {
    setLoading(true);
    const res = await fetch(`${BASE_URL}/library/user/${userId}`);
    const data = await res.json();
    setLibraryBooks(data);
    setLoading(false);
  };

  const fetchLists = async () => {
    setLoading(true);
    const res = await fetch(`${BASE_URL}/readinglist/user/${userId}`);
    const data = await res.json();
    setReadingLists(data);
    setLoading(false);
  };

  const handleListClick = (listId) => {
    setSelectedListId((prev) => (prev === listId ? null : listId));
  };

  const handleRemoveFromLibrary = async (storyId) => {
    try {
      await axios.delete(`${BASE_URL}/library`, {
        data: {
          userId, // make sure this is available
          storyId,
        },
      });
      alert("Book removed from library!");

      setLibraryBooks((prev) =>
        prev.filter((book) => book.story.id !== storyId)
      );
    } catch (err) {
      console.error("Failed to remove book:", err);
      alert("Could not remove book from library.");
    }
  };

  const handleRemove = (e, storyId) => {
    e.stopPropagation(); // 🔒 Stops it from triggering the parent
    handleRemoveFromLibrary(storyId); // or reading list
  };

  const handleDeleteReadingList = async (listId) => {
    try {
      await axios.delete(`${BASE_URL}/readinglist/${listId}`);
      alert("Reading list deleted!");

      setReadingLists((prev) => prev.filter((list) => list.id !== listId));
    } catch (err) {
      console.error("Failed to delete reading list:", err);
      alert("Could not delete reading list.");
    }
  };

  const handleDeleteList = (e, listId) => {
    e.stopPropagation();
    handleDeleteReadingList(listId);
  };

  const handleCreateList = async () => {
    setLoading(true);
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
  setLoading(false);
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
              <div
                className="book-card"
                key={book.id}
                onClick={() => navigate(`/read/${book.story.id}`)}
              >
                <img src={book.story.coverImage} alt={book.story.title} />
                <h4>{book.story.title}</h4>
                <p>{book.story.author}</p>
                <button className = "delete-btn" onClick={(e) => handleRemove(e, book.story.id)}>
                  🚮
                </button>
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
                  <button className = "delete-btn" onClick={(e) => handleDeleteList(e, list.id)}>
                    🚮
                  </button>
                </div>
              ))}
            </div>

            {selectedListId && (
              <div
                className="modal-overlay"
                onClick={() => setSelectedListId(null)}
              >
                <div className="modal" onClick={(e) => e.stopPropagation()}>
                  <h2>
                    {readingLists.find((list) => list.id === selectedListId)
                      ?.name || "Reading List Stories"}
                  </h2>
                  <div className="modal-scroll">
                    {readingLists
                      .find((list) => list.id === selectedListId)
                      ?.story?.map((story, index) => {
                        if (!story) {
                          console.warn("Missing story data at index", index);
                          return null;
                        }
                        return (
                          <div
                            className="book-card"
                            key={story.id}
                            onClick={() => navigate(`/read/${story.id}`)}
                          >
                            <img src={story.coverImage} alt={story.title} />
                            <h4>{story.title}</h4>
                            <div className="description">
                              <p>{story.description?.slice(0, 120)}...</p>
                            </div>
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
