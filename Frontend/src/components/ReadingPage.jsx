import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/api.js";
import Header from "./Header.jsx";
import "./ReadingPage.css";

const dummyChapters = [
  {
    title: "Chapter 1 – The Pain He Felt That Day",
    content: "I woke up earlier than usual due to a dull pain in my head...",
  },
  {
    title: "Chapter 2 – A Pleading Silence",
    content: "The hallway echoed with silence as I stepped outside...",
  },
];

const ReadingPage = () => {
  const { bookId } = useParams();
  const [backendChapters, setBackendChapters] = useState([]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  useEffect(() => {
const savedIndex = localStorage.getItem(`bookmark-${bookId}`);
if (savedIndex !== null) {
setCurrentChapterIndex(parseInt(savedIndex, 10));
}
}, [bookId]);
  const [loading, setLoading] = useState(true);
  const [storyInfo, setStoryInfo] = useState(null);
  const userId = localStorage.getItem("userId");

  const chaptersToUse =
    backendChapters.length > 0 ? backendChapters : dummyChapters;
  const currentChapter = chaptersToUse[currentChapterIndex];

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await fetch(`${BASE_URL}/chapters/all/${bookId}`);
        if (!res.ok) throw new Error("Failed to fetch chapters");

        const data = await res.json();
        setBackendChapters((data || []).filter((ch) => ch.isDraft === false));
      } catch (err) {
        console.error("Error fetching chapters:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchStoryInfo = async () => {
      try {
        const res = await fetch(`${BASE_URL}/stories/${bookId}`);
        if (!res.ok) throw new Error("Failed to fetch story info");
        const data = await res.json();
        setStoryInfo(data);
      } catch (err) {
        console.error("Error fetching story info:", err);
      }
    };

    fetchChapters();
    fetchStoryInfo();
  }, [bookId]);

  const saveBookmark = async (index) => {
try {
await fetch(`${BASE_URL}/bookmark`, {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
userId,
storyId: bookId,
chapterIndex: index, 
}),
});
console.log("Bookmark saved!");
} catch (err) {
console.error("Failed to save bookmark:", err);
}
};

  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const endTime = Date.now();
      const duration = Math.floor((endTime - startTime) / 1000);

      fetch(`${BASE_URL}/engagement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          storyId: bookId,
          duration,
        }),
      });
    };
  }, []);

  if (loading) return <p>Loading chapters...</p>;

  return (
    <>
      <Header />
      {storyInfo && (
        <div className="story-banner">
          <img
            src={storyInfo.coverImage || "https://picsum.photos/1200/400"}
            alt={storyInfo.title}
            className="story-banner-img"
          />
          <h1 className="story-title">{storyInfo.title}</h1>
          <p className="story-author">by {storyInfo.author?.username}</p>
        </div>
      )}

      <div className="reading-page">
        <aside className="chapter-sidebar">
          <h3>Chapters</h3>
          <ul>
            {chaptersToUse.map((chapter, index) => (
              <li
                key={chapter.id || index}
                className={index === currentChapterIndex ? "active" : ""}
                onClick={() => {
                  setCurrentChapterIndex(index);
                  localStorage.setItem(`bookmark-${bookId}`, index);
                
                }}
              >
                {chapter.title}
              </li>
            ))}
          </ul>
        </aside>

        <main className="chapter-content">
          <h2>{currentChapter.title}</h2>
          <p>{currentChapter.content}</p>
        </main>
      </div>
    </>
  );
};

export default ReadingPage;
