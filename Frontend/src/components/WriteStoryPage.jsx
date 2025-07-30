import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { set, get, keys, del } from "idb-keyval";
import Header from "./Header";
import { BASE_URL } from "../utils/api.js";
import "./WriteStoryPage.css";

export default function WritePage() {
  const { id, chapterId } = useParams();
  const [story, setStory] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [chapterTitle, setChapterTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [saveStatus, setSaveStatus] = useState("");

  // 1. Load story & chapter (backend or cache)
  useEffect(() => {
    const fetchStory = async () => {
      if (!id) return;

      try {
        const res = await axios.get(`${BASE_URL}/stories/${id}`);
        setStory(res.data);
        setAuthorId(res.data.authorId);
        // Cache the story
        await set(`story-${id}`, res.data);
      } catch (err) {
        console.warn("Offline or error fetching story, loading from cache");
        const cachedStory = await get(`story-${id}`);
        if (cachedStory) {
          setStory(cachedStory);
          setAuthorId(cachedStory.authorId || "");
        }
      }
    };

    const fetchChapter = async () => {
      if (!chapterId) return;

      try {
        const res = await axios.get(`${BASE_URL}/chapters/${chapterId}`);
        const chapterData = res.data.chapter;
        setChapter(chapterData);
        setChapterTitle(chapterData.title || "");
        setContent(chapterData.content || "");
        setAuthorId(chapterData.authorId || "");

        // Cache chapter
        await set(`draft-${chapterId}`, chapterData);
      } catch (err) {
        console.warn("Offline or error fetching chapter, loading from cache");
        const cachedChapter = await get(`draft-${chapterId}`);
        if (cachedChapter) {
          setChapterTitle(cachedChapter.title || "");
          setContent(cachedChapter.content || "");
          setAuthorId(cachedChapter.authorId || "");
        }
      }
    };

    fetchStory();
    fetchChapter();
  }, [id, chapterId]);

  // 2. Auto-save after pause in typing
  useEffect(() => {
    const handler = setTimeout(() => {
      autoSaveDraft();
    }, 2000); // 2 sec pause

    return () => clearTimeout(handler);
  }, [chapterTitle, content]);

  const autoSaveDraft = async () => {
    if (!chapterId || !id || !authorId) return;

    const draft = {
      chapterId,
      storyId: id,
      title: chapterTitle,
      content,
      authorId,
      updatedAt: new Date().toISOString(),
    };

    await set(`draft-${chapterId}`, draft);
    setSaveStatus("Draft Saved!❤️");
  };

  // 3. Sync drafts when back online
  useEffect(() => {
    const syncIfOnline = async () => {
      if (navigator.onLine) {
        const draftKeys = (await keys()).filter((k) => k.startsWith("draft-"));
        for (let key of draftKeys) {
          const draft = await get(key);
          if (!draft.chapterId || !draft.storyId || !draft.authorId) continue;

          try {
            await axios.post(`${BASE_URL}/chapters/save-draft`, draft);
            await del(key); // Delete from cache after sync
            console.log(`Synced: ${key}`);
            setSaveStatus("✅ Draft synced online");
          } catch (err) {
            console.error("❌ Failed to sync draft:", err);
          }
        }
      }
    };

    window.addEventListener("online", syncIfOnline);
    syncIfOnline();

    return () => {
      window.removeEventListener("online", syncIfOnline);
    };
  }, []);

  // 4. Manual save/publish
  const handleChapterAction = async ({ isDraft, isPublished }) => {
    if (!chapterTitle.trim() || !content.trim()) {
      return alert(
        "Please fill out chapter title and content before publishing."
      );
    }

    const payload = {
      chapterId,
      title: chapterTitle,
      content,
      isDraft,
      isPublished,
      storyId: id,
      authorId,
    };

    try {
      if (chapterId) {
        await axios.put(`${BASE_URL}/chapters/${chapterId}`, payload);
      } else {
        await axios.post(`${BASE_URL}/chapters`, payload);
      }

      const action = isPublished ? "published" : "saved as draft";
      alert(`Chapter successfully ${action}!`);
    } catch (err) {
      alert("❌ Failed to save chapter.");
    }
  };



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
        </div>

        <div className="story-info">
          <h3 className="story-title">{story?.title || "Loading story..."}</h3>
          <p className="story-status">
            Draft • {content?.length || 0} Words • {saveStatus}
          </p>
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
            onClick={() => {
              if (!navigator.onLine) {
                autoSaveDraft(chapterId, id, chapterTitle, content, authorId);
                setSaveStatus("Saved offline. Will sync when online.");
              } else {
                handleChapterAction({ isDraft: true, isPublished: false });
              }
            }}
          >
            Save
          </button>


          <button
            className="publish-button"
            onClick={() => {
              if (!navigator.onLine) {
                alert("You're offline. Please connect to publish.");
                return;
              }
              handleChapterAction({ isDraft: false, isPublished: true });
            }}
          >
            Publish
          </button>
        </div>
       
      </div>
       <footer className="welcome-footer">© 2025 Novella</footer>
    </>
  );
}
