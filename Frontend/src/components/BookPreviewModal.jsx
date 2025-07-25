import React, { useEffect, useState } from "react";
import "./BookPreviewModal.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/api";

const BookPreviewModal = ({ books, selectedBookId, onClose }) => {
  const navigate = useNavigate();
  const [readingLists, setReadingLists] = useState([]);
  const [liked, setLiked] = useState(false);
  const [read, setRead] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const userId = localStorage.getItem("userId");

  const selectedBook = books.find((book) => book.id === selectedBookId);

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
      await axios.post(`${BASE_URL}/library`, {
        storyId: selectedBookId,
        userId,
      });
      alert("Book added to Library!");
    } catch (err) {
      console.error("Failed to add to library:", err);
      alert("Failed to add to library.");
    }
  };

  const handleLike = async () => {
    try {
      await axios.post(`${BASE_URL}/stories/${selectedBookId}/like`, {
        userId,
      });
      setLiked(!liked);
    } catch (err) {
      console.error("Failed to like book:", err);
      alert("Failed to like book.");
    }
  };

  const handleMarkAsRead = async () => {
    try {
      await axios.post(`${BASE_URL}/stories/${selectedBookId}/read`, {
        userId,
      });
      setRead(!read);
    } catch (err) {
      console.error("Failed to mark book as read:", err);
      alert("Failed to mark book as read.");
    }
  };

  const handleAddToReadingList = async (listId) => {
    try {
      await axios.post(`${BASE_URL}/readinglist/${listId}/add-book`, {
        storyId: selectedBookId,
      });
      alert("Book added to reading list!");
    } catch (err) {
      console.error("Failed to add to reading list:", err);
      alert("Failed to add to reading list.");
    }
  };

  if (!selectedBook) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Sneak Peek 👀</h2>

        <div className="modal-cover">
          <img src={selectedBook.coverImage} alt={selectedBook.title} />
        </div>

        <h3 className="book-title">{selectedBook.title}</h3>
        <p className="book-author">{selectedBook.author}</p>
        <p className="book-description">{selectedBook.description}</p>

        <div className="modal-actions">
          <button onClick={handleLike}>{liked ? "❤️" : "🤍"}</button>
          <button onClick={handleMarkAsRead}>
            {read ? "📖 " : "📕"}
          </button>

          <button className="start-reading" onClick={handleStartReading}>
            Start Reading
          </button>

          <div className="dropdown-container">
            <button
              className="dropdown-toggle"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              +
            </button>

            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={handleAddToLibrary}>Library</button>
                {readingLists.map((list) => (
                  <button
                    key={list.id}
                    onClick={() => handleAddToReadingList(list.id)}
                  >
                    {list.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPreviewModal;
