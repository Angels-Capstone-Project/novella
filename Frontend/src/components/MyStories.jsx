import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/api.js";
import "./MyStories.css";
import Header from "./Header.jsx";
import { FaTrash } from "react-icons/fa";
import { fetchWithCache } from "../utils/fetchWithCache.js";
import useOnlineStatus from "../utils/useOnlineStatus.js";

const MyStories = ({ user }) => {
  const [stories, setStories] = useState([]);
  const [chaptersMap, setChaptersMap] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const isOnline =useOnlineStatus();


  useEffect(() => {
    const fetchStories = async () => {
      await fetchWithCache({
        cacheKey: `mystories-${userId}`,
        getUrl: `${BASE_URL}/user/${userId}`,
        postUrl: `${BASE_URL}/mystories/${userId}`,
        postPayload:  {stories: stories} , 
        setState: setStories,
        isOnline,
      });
    };

    if (userId) fetchStories();
  }, [userId, isOnline]);

  const handleEdit = (storyId, chapterId) => {
    navigate(`/write/${storyId}/${chapterId}`);
  };

  const handleNextPart = async (storyId, nextOrder) => {
    try {
      navigate(`/write/${storyId}`);
    } catch (err) {
      console.error("Error creating next part:", err);
    }
  };

  const handleDeleteChapter = async (chapterId, storyId) => {
    try {
      await fetch(`${BASE_URL}/chapters/${chapterId}`, {
        method: "DELETE",
      });

      setChaptersMap((prev) => ({
        ...prev,
        [storyId]: prev[storyId]?.filter((ch) => ch.id !== chapterId),
      }));

      console.log("Chapter deleted");
    } catch (error) {
      console.error("Error deleting chapter:", error);
    }
  };

  const handleDeleteStory = async (storyId) => {
    try {
      const res = await fetch(`${BASE_URL}/stories/${storyId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete story");

      // Remove story from UI
      setStories((prev) => prev.filter((story) => story.id !== storyId));
    } catch (err) {
      console.error("Error deleting story:", err);
    }
  };

  const handleToggleDropdown = async (storyId) => {
    if (openDropdown === storyId) {
      setOpenDropdown(null); // close it
      return;
    }

    setOpenDropdown(storyId); // open it

    await fetchWithCache({
      cacheKey: `chapters-${storyId}`,
      getUrl: `${BASE_URL}/chapters/all/${storyId}`,
      postUrl: `${BASE_URL}/chapters/sync/${storyId}`,
        postPayload:  chaptersMap[storyId] ,
      setState: (fetchedChapters) =>
        setChaptersMap((prev) => ({
          ...prev,
          [storyId]: fetchedChapters,
        })),
      isOnline,
    });
  };

  return (
    <>
      <Header />
      <div className="my-stories-container">
        <h2>My Stories</h2>
        {stories.length === 0 ? (
          <p>You haven't written any stories yet.</p>
        ) : (
          <div className="story-list">
            {stories.map((story) => (
              <div key={story.id} className="story-card">
                <img
                  src={story.coverImage}
                  alt="Cover"
                  className="story-cover"
                />
                <div className="story-info">
                  <h3>{story.title}</h3>
                  <button
                    onClick={() => handleDeleteStory(story.id)}
                    className="delete-btn"
                  >
                    <FaTrash />
                  </button>
                  <p>{story.description?.slice(0, 80)}...</p>
                  <p>{story._count?.likedBy || 0} likes</p>
                </div>
                <div className="story-controls">
                  <button
                    className="continue-button"
                    onClick={() => handleToggleDropdown(story.id)}
                  >
                    Continue writing ▼
                  </button>

                  {openDropdown === story.id && (
                    <div className="draft-dropdown">
                      {Array.isArray(chaptersMap[story.id]) &&
                      chaptersMap[story.id].length > 0 ? (
                        chaptersMap[story.id].map((chapter) => (
                          <div key={chapter.id} className="draft-item">
                            <span>
                              Chapter {chapter.order} – {chapter.title} (
                              {chapter.isDraft ? "Draft" : "Published"})
                            </span>
                            <div className="draft-actions">
                              <button
                                onClick={() => handleEdit(story.id, chapter.id)}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteChapter(chapter.id, story.id)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="draft-item no-drafts">
                          No chapters found
                        </div>
                      )}
                      <button
                        onClick={() => handleNextPart(story.id)}
                        className="next-part-button"
                      >
                        ➕ New Part
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyStories;
