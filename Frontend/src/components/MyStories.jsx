// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/api";
// import "./MyStories.css";

// const MyStories = ({ user }) => {
//   const [stories, setStories] = useState([]);
//   const navigate = useNavigate();
//   const userId = localStorage.getItem("userId")

//   useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         const response = await fetch(
//           `${BASE_URL}/user/${userId}`
//         );
//         const data = await response.json();
//         setStories(data);
//       } catch (error) {
//         console.error("Error fetching stories:", error);
//       }
//     };

//     if (userId) {
//       fetchStories();
//     }
//   }, [userId]);

//   const handleEdit = (storyId) => {
//     navigate(`/write/${storyId}`);
//   };

//   return (
//     <div className="my-stories-container">
//       <h2>My Stories</h2>
//       {stories.length === 0 ? (
//         <p>You haven’t written any stories yet.</p>
//       ) : (
//         <div className="story-list">
//           {stories.map((story) => (
//             <div
//               className="story-card"
//               key={story.id}
//               onClick={() => handleEdit(story.id)}
//             >
//               <img src={story.coverImage} alt="Cover" className="story-cover" />
//               <div className="story-info">
//                 <h3>{story.title}</h3>
//                 <p>{story.description?.slice(0, 80)}...</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyStories;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/api";
import "./MyStories.css";

const MyStories = ({ user }) => {
  const [stories, setStories] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [draftsMap, setDraftsMap] = useState({});
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

  const handleEdit = (storyId) => {
    navigate(`/write/${storyId}`);
};

  const handleToggleDropdown = async (storyId) => {
    if (openDropdown === storyId) {
      setOpenDropdown(null);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/chapters/drafts/${storyId}`);
      const data = await res.json();
      setDraftsMap((prev) => ({
        ...prev,
        [storyId]: data,
      }));
      setOpenDropdown(storyId);
    } catch (error) {
      console.error("Error fetching drafts:", error);
    }
  };

  return (
    <div className="my-stories-container">
      <h2>My Stories</h2>
      {stories.length === 0 ? (
        <p>You haven’t written any stories yet.</p>
      ) : (
        <div className="story-list">
          {stories.map((story) => (
            <div key={story.id} className="story-card">
              <img src={story.coverImage} alt="Cover" className="story-cover" />
              <div className="story-info">
                <h3>{story.title}</h3>
                <p>{story.description?.slice(0, 80)}...</p>
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
                    {Array.isArray(draftsMap[story.id]) &&
                    draftsMap[story.id].length > 0 ? (
                      draftsMap[story.id].map((draft) => (
                        <div
                          key={draft.id}
                          className="draft-item"
                          onClick={() => handleEdit(story.id, draft.id)}
                        >
                          Chapter {draft.order}: {draft.title}
                        </div>
                      ))
                    ) : (
                      <div className="draft-item no-drafts">
                        No drafts found
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
