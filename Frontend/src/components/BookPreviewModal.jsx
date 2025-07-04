import React, { useEffect, useState } from "react";
import "./BookPreviewModal.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/api";

const BookPreviewModal = ({ books, selectedBookId, onClose }) => {
  const navigate = useNavigate();
  const [readingLists, setReadingLists] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchReadingLists = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/readinglist/user/${userId}`);
        setReadingLists(res.data);
      } catch (err) {
        console.error("Failed to fetch reading lists:", err);
      }
    };

    if (userId) fetchReadingLists();
  }, [userId]);

  const handleStartReading = () => {
    navigate(`/read/${selectedBookId}`);
  };

  const handleAddToLibrary = async () => {
    try {
      console.log("sending to library", userId , "and", selectedBookId);
      await axios.post(`${BASE_URL}/library`, {
        userId,
        storyId: selectedBookId,
      });
      alert("Book added to Library!");
    } catch (err) {
      console.error("Failed to add to library", err);
      alert("Failed to add to library.");
    }
  };

  const handleAddToReadingList = async (listId) => {
    try {
      await axios.post(`${BASE_URL}/readingList/${listId}/add-book`, {
        storyId: selectedBookId,
      });
      alert("Book added to Reading List!");
    } catch (err) {
      console.error("Failed to add to reading list", err);
      alert("Failed to add to reading list.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Book Preview</h2>
        <div className="book-scroll-row">
          {books.map((book) => (
            <div
              key={book.id}
              className={`book-card ${
                book.Id === selectedBookId ? "selected" : ""
              }`}
            >
              <img src={book.coverImage} alt={book.title} />
              <h4>{book.title}</h4>
              <p className="author">{book.author}</p>
              <p className="description">{book.description}</p>
              <div className="actions">
                <button className="start-reading" onClick={handleStartReading}>
                  Start Reading
                </button>
                <button className="add-library" onClick={handleAddToLibrary}>
                  + Library
                </button>
                <div className="reading-list-dropdown">
                  <label htmlFor="readingList">Add to Reading List:</label>
                  <select
                    onChange={(e) => handleAddToReadingList(e.target.value)}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a list
                    </option>
                    {readingLists.map((list) => (
                      <option key={list.id} value={list.id}>
                        {list.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookPreviewModal;
