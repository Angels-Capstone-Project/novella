import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/api.js";
import Header from "./Header";
import "./WriteStoryPage.css";

export default function WritePage() {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [chapterTitle, setChapterTitle] = useState("Untitled Part ");
  const [content, setContent] = useState("");
  const [banner, setBanner] = useState("");

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/stories/${id}`);
        setStory(res.data);
      } catch (err) {
        console.error("Error fetching story:", err);
      }
    };

    if (id) fetchStory();
  }, [id]);

  const handleChapterAction = async ({ isDraft, isPublished }) => {
    try {
      await axios.post(`${BASE_URL}/chapters`, {
        storyId: id,
        title: chapterTitle,
        content,
        bannerImage: banner,
        isDraft,
        isPublished,
      });

      const action = isPublished ? "published" : "saved as draft";
      alert(`Chapter successfully ${action}!`);
      if(isPublished && (!chapterTitle.trim() || !content.trim())){
        return alert("Please fill out chapter title and content before publishing. ")
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  const handlePreview = () => {
    alert("preview would open here!");
  }


  return (
    <>
      <Header />
      <div className="write-container">
        {/* Story Header */}
        <div className="story-header">
          {story?.coverImage && (
            <img
              src={story.coverImage}
              alt="Story Cover"
              className="story-cover-image"
            />
          )}
          <div className="story-info">
            <h3 className="story-title">
              {story?.title || "Loading story..."}
            </h3>
            <p className="story-status">Draft • 0 Words • Saved</p>
          </div>
        </div>

        {banner && (
          <img src={banner} alt="Chapter Banner" className="chapter-banner" />
        )}

        <div className="banner-upload">
          <input
            type="text"
            placeholder="Optional: Paste a banner image URL here"
            value={banner}
            onChange={(e) => setBanner(e.target.value)}
          />
        </div>

        <input
          value={chapterTitle}
          onChange={(e) => setChapterTitle(e.target.value)}
          placeholder="Chapter Title"
          className="chapter-title-input"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type your text"
          className="chapter-textarea"
        />

        <div className="chapter-actions">
          <button className="save-button" 
          onClick={() => handleChapterAction({isDraft: true, isPublished: false})}>
            Save
          </button>

          <button className="preview-button"
          onClick={handlePreview}>Preview</button>

          <button className="publish-button"
          onClick={() => handleChapterAction({isDraft: false, isPublished: true})}>Publish</button>
        </div>
      </div>
    </>
  );
}
