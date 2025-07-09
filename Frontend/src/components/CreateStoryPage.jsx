import { useState } from "react";
import "./CreateStoryPage.css";

export default function CreateStoryPage() {
  const [coverImage, setCoverImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [audience, setAudience] = useState("");

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    setCoverImage(URL.createObjectURL(file));
  };

  const addCharacter = () => {
    if (mainCharacter.trim()) {
      setCharacters([...characters, mainCharacter]);
      setMainCharacter("");
    }
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO:  send this to backend with fetch or axios
    console.log({
      coverImage,
      title,
      description,
      characters,
      category,
      tags,
      audience,
    });
  };

  return (
    <div className="create-story-container">
      <h2 className="form-header">Story Details</h2>

      <form onSubmit={handleSubmit} className="story-form">
        {/* Left column – Cover Upload */}
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

        {/* Right column – Fields */}
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
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
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
