import React from "react";
import "./BookPreviewModal.css";

const BookPreviewModal = ({ books, selectedBookId, onClose }) => {
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
                <button className="start-reading">Start Reading</button>
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
