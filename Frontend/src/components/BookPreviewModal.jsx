import React, {useEffect, useState}from "react";
import "./BookPreviewModal.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookPreviewModal = ({ books, selectedBookId, onClose }) => {
  const navigate = useNavigate();
  const [readingLists, setReadingList]= useState([]);
  const userId = localStorage.getItem("userId");

  const handleStartReading =() => {
    navigate(`/read/${selectedBookId}`);
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
                book.id === selectedBookId ? "selected" : ""
              }`}
            >
              <img src={book.coverImage} alt={book.title} />
              <h4>{book.title}</h4>
              <p className="author">{book.author}</p>
              <p className="description">{book.description}</p>
              <div className="actions">
                <button className="start-reading" onClick={handleStartReading}>Start Reading</button>
                <button className="add-library">+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookPreviewModal;
