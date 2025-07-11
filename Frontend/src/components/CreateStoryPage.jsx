import { useState } from "react";
import "./CreateStoryPage.css";
import { BASE_URL } from "../utils/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateStoryPage() {
  const [coverImage, setCoverImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setgenre] = useState("");
  const [audience, setAudience] = useState("");

  const navigate = useNavigate();

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    setCoverImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const authorId = localStorage.getItem("userId"); 
    if (!authorId) {
      alert("You must be logged in to create a story.");
      return;
    }

    const fileInput = document.querySelector('input[type="file"]');
    const file = fileInput?.files?.[0];

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("genre", genre);
    formData.append("audience", audience);
    if (file) formData.append("coverImage", file); 
    formData.append("authorId", authorId); 

    try {
      const response = await axios.post(`${BASE_URL}/stories`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });

      console.log("Story created successfully!", response.data);
      alert("Story created!");
      navigate(`/write/${response.data.id}`);
     
    } catch (error) {
      console.error("Error creating story:", error);
      alert("Failed to create story. Check console for more info.");
    }
  };

  return (
    <div className="create-story-container">
      <h2 className="form-header">Story Details</h2>

      <form onSubmit={handleSubmit} className="story-form">
        <div className="form-left">
          <label className="cover-label">Add a Cover</label>
          <input type="file" accept="image/*" onChange={handleCoverUpload} />
          {coverImage && (
            <img
              src={coverImage}
              alt="Cover preview"
              className="cover-preview"
            />
          )}
        </div>

        <div className="form-right">
          <div className="form-section">
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your story title"
            />
          </div>

          <div className="form-section">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write a brief summary..."
            />
          </div>

          <div className="form-section">
            <label>Genre</label>
            <select value={genre} onChange={(e) => setgenre(e.target.value)}>
              <option value="">Select a category</option>
              <option value="romance">Romance</option>
              <option value="thriller">Thriller</option>
              <option value="fantasy">Fantasy</option>
              <option value="drama">Drama</option>
            </select>
          </div>

          <div className="form-section">
            <label>Target Audience</label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            >
              <option value="">Who is your primary audience?</option>
              <option value="everyone">Everyone</option>
              <option value="teens">Teens (13+)</option>
              <option value="mature">Mature (18+)</option>
            </select>
          </div>

          <button type="submit" className="submit-btn">
            Create Story
          </button>
        </div>
      </form>
    </div>
  );
}
