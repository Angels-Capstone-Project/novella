import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const dummyChapters = [
  {
    title: "Chapter 1 - The Pain He Felt That Day",
    content: "I woke up earlier than usual due to a dull pain in my head...",
  },
  {
    title: "Chapter 2 - A Pleading Silence",
    content: "The hallway echoed with silence as I stepped outside...",
  },
  
];

const ReadingPage = () => {
  const { bookId } = useParams();
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  const currentChapter = dummyChapters[currentChapterIndex];

  return (
    <div className="reading-page">
      <aside className="chapter-sidebar">
        <h3>Chapters</h3>
        <ul>
          {dummyChapters.map((chapter, index) => (
            <li
              key={index}
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
