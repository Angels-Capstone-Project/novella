import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/api.js";
import "./MyStories.css";

const MyStories = ({ user }) => {
  const [stories, setStories] = useState([]);
  const [chaptersMap, setChaptersMap] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/user/${userId}`);
        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };

    if (userId) {
      fetchStories();
    }
  }, [userId]);

  const handleEdit = (storyId, chapterId) => {
    navigate(`/write/${storyId}/${chapterId}`);
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

  const handleToggleDropdown = async (storyId) => {
    if (openDropdown === storyId) {
      setOpenDropdown(null);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/chapters/all/${storyId}`);
      const data = await res.json();
      setChaptersMap((prev) => ({
        ...prev,
        [storyId]: data,
      }));
      setOpenDropdown(storyId);
    } catch (error) {
      console.error("Error fetching chapters:", error);
    }
  };

  return (
    <div className="my-stories-container">
      <h2>My Stories</h2>
      {stories.length === 0 ? (
        <p>You haven't written any stories yet.</p>
      ) : (
        <div className="story-list">
          {stories.map((story) => (
            <div key={story.id} className="story-card">
              <img src={story.coverImage} alt="Cover" className="story-cover" />
              <div className="story-info">
                <h3>{story.title}</h3>
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
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyStories;
