import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/api";
import "./CommentSection.css";

const CommentSection = ({ storyId }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const userId = localStorage.getItem("userId");
  const [liked, setLiked] = useState(false);

  const fetchComments = async () => {
    const res = await fetch(`${BASE_URL}/comments/story/${storyId}`);
    const data = await res.json();
    setComments(data);
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    await fetch(`${BASE_URL}/comments/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, storyId, authorId: userId }),
    });
    setText("");
    fetchComments();
  };

   const handleLike = async () => {
      setLiked(!liked);
  };

  useEffect(() => {
    fetchComments();
  }, [storyId]);

  return (
    <div className="comment-section">
      <div className="comment-input">
        <img src="/default-avatar.png" alt="Profile" className="avatar" />
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={handleSubmit} className="send-btn">
          ➤
        </button>
      </div>

      <div className="comment-list">
        {comments.map((c) => (
          <div key={c.id} className="comment-item">
            <img src="/default-avatar.png" alt="Avatar" className="avatar" />
            <div className="comment-content">
              <strong>{c.author?.username || "Anonymous"}</strong>
              <p>{c.text}</p>
              <div className="comment-footer">
                <span>{new Date(c.createdAt).toLocaleString()}</span>
                 <button onClick={handleLike}>{liked ? "❤️" : "🤍"}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
