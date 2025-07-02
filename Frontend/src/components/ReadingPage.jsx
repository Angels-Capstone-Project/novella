import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/api.js";
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
  const [loading, setLoading] = useState(true);

  const chaptersToUse =
    backendChapters.length > 0 ? backendChapters : dummyChapters;
  const currentChapter = chaptersToUse[currentChapterIndex];

  useEffect(() => {
    const fetchChapters = async () => {
      try {
        const res = await fetch(`${BASE_URL}/chapters/story/${bookId}`);
        if (!res.ok) throw new Error("Failed to fetch chapters");
        const data = await res.json();
        setBackendChapters(data.chapters || []);
      } catch (err) {
        console.error("Error fetching chapters:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [bookId]);

  if (loading) return <p>Loading chapters...</p>;

  return (
    <div className="reading-page">
      <aside className="chapter-sidebar">
        <h3>Chapters</h3>
        <ul>
          {chaptersToUse.map((chapter, index) => (
            <li
              key={chapter.id || index}
              className={index === currentChapterIndex ? "active" : ""}
              onClick={() => setCurrentChapterIndex(index)}
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
  );
};

export default ReadingPage;
