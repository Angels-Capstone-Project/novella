import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/api";
import "./MyStories.css";

const MyStories = ({ user }) => {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/user/${userId}`
        );
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

  const handleEdit = (storyId) => {
    navigate(`/write/${storyId}`);
  };

  return (
    <div className="my-stories-container">
      <h2>My Stories</h2>
      {stories.length === 0 ? (
        <p>You haven’t written any stories yet.</p>
      ) : (
        <div className="story-list">
          {stories.map((story) => (
            <div
              className="story-card"
              key={story.id}
              onClick={() => handleEdit(story.id)}
            >
              <img src={story.coverImage} alt="Cover" className="story-cover" />
              <div className="story-info">
                <h3>{story.title}</h3>
                <p>{story.description?.slice(0, 80)}...</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyStories;
