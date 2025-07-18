import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/api.js";
import Header from "./Header";
import { set, get, del, keys } from "idb-keyval";
import "./WriteStoryPage.css";

export default function WritePage() {
  const { id, chapterId } = useParams();
  const [story, setStory] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [chapterTitle, setChapterTitle] = useState("");
  const [content, setContent] = useState("");
  const [banner, setBanner] = useState("");
  const [authorId, setAuthorId]= useState("");

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/stories/${id}`);
        setAuthorId(res.data.authorId);
        setStory(res.data);
      } catch (err) {
        console.error("Error fetching story:", err);
      }
    };

    const fetchChapter = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/chapters/${chapterId}`);
        const fetched = res.data.chapter;

        if (!fetched) {
          console.warn("No chapter found. ");
          return;
        }
        setChapter(fetched);
        setChapterTitle(fetched.title || "");

        setContent(fetched.content || "");
        console.log("Content stuff ", fetched.content);
        setBanner(fetched.bannerImage || "");
        console.log("Fetched data: ", fetched);
      } catch (err) {
        console.error("Error fetching chapter:", err);
      }
    };
    if (id) fetchStory();
    if (chapterId) fetchChapter();
  }, [id, chapterId]);

  const autoSaveDraft = async (
    chapterId,
    storyId,
    title,
    content,
    authorId
  ) => {
    const draft = {
      chapterId,
      storyId,
      title,
      content,
      authorId,
      updatedAt: new Date().toISOString(),
    };
    await set(`draft-${chapterId}`, draft);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      autoSaveDraft(chapterId, id, chapterTitle, content, authorId);
    }, 2000); // autosave every 2s
    return () => clearTimeout(timer);
  }, [chapterTitle, content]);

  useEffect(() => {
    const syncIfOnline = async () => {
      if (navigator.onLine) {
        await syncDraftsToBackend();
      }
    };

    window.addEventListener("online", syncIfOnline);
    syncIfOnline();

    return () => {
      window.removeEventListener("online", syncIfOnline);
    };
  }, []);

  const syncDraftsToBackend = async () => {
    const keys = await keys(); 
    const draftKeys = keys.filter((k) => k.startsWith("draft-"));
    for (const key of draftKeys) {
      const draft = await get(key);
      try {
        await axios.post("/chapters/save-draft", draft);
        await del(key); // remove after syncing
      } catch (err) {
        console.error("Failed to sync draft:", err);
      }
    }
  };

  const handleChapterAction = async ({ isDraft, isPublished }) => {
    try {
      if (!chapterTitle.trim() || !content.trim()) {
        return alert(
          "Please fill out chapter title and content before publishing."
        );
      }

      const payload = {
        title: chapterTitle,
        content,
        bannerImage: banner,
        isDraft,
        isPublished,
      };

      if (chapterId) {
        // Update existing chapter
        await axios.put(`${BASE_URL}/chapters/${chapterId}`, payload);
      } else {
        // Create new chapter
        await axios.post(`${BASE_URL}/chapters`, {
          ...payload,
          storyId: id,
        });
      }

      const action = isPublished ? "published" : "saved as draft";
      alert(`Chapter successfully ${action}!`);
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  const handlePreview = () => {
    alert("preview would open here!");
  };

  console.log("title:", chapterTitle);
  console.log("content:", content);

  return (
    <>
      <Header />
      <div className="write-container">
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
          <button
            className="save-button"
            onClick={() =>
              handleChapterAction({ isDraft: true, isPublished: false })
            }
          >
            Save
          </button>

          <button className="preview-button" onClick={handlePreview}>
            Preview
          </button>

          <button
            className="publish-button"
            onClick={() =>
              handleChapterAction({ isDraft: false, isPublished: true })
            }
          >
            Publish
          </button>
        </div>
      </div>
    </>
  );
}
