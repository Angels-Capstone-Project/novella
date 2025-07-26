import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/api.js";
import BookPreviewModal from "./BookPreviewModal.jsx";
import RotatingBanner from "./RotatingBanner.jsx";
import Header from "./Header.jsx";
import { clearCache } from "../utils/cache.js";
import { fetchWithCache } from "../utils/fetchWithCache";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import "./Home.css";

const Home = ({ userId, setLoading }) => {
  const [topPicks, setTopPicks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [topUS, setTopUS] = useState([]);
  const [trendingByGenre, setTrendingByGenre] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [booksInRow, setBooksInRow] = useState([]);
  const [hasReloadedOnline, sethasReloadedOnline] = useState(false);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (!userId) return;
    {setLoading(true)
      fetchWithCache({
        cacheKey: "topPicks",
        getUrl: `${BASE_URL}/top-picks/${userId}`,
        postUrl: `${BASE_URL}/topPicks/${userId}`,
        setState: setTopPicks,
        postPayload: { topPicks: topPicks },
        isOnline,
      });

      fetchWithCache({
        cacheKey: "topUS",
        getUrl: `${BASE_URL}/top-us`,
        postUrl: `${BASE_URL}/topUs/${userId}`,
        setState: setTopUS,
        postPayload: { topUS: topUS },
        isOnline,
      });

      fetchWithCache({
        cacheKey: "genres",
        getUrl: `${BASE_URL}/genre-all`,
        postUrl: `${BASE_URL}/genres/${userId}`,
        setState: setGenres,
        postPayload: { genres: genres },
        isOnline,
      });

      fetchWithCache({
        cacheKey: "trendingByGenre",
        getUrl: `${BASE_URL}/genre-all`,
        postUrl: `${BASE_URL}/trendingByGenre/${userId}`,
        postPayload: { trendingByGenre: trendingByGenre },
        setState: setTrendingByGenre,
        isOnline,
      });
      setLoading(false);
    }
  }, [userId, isOnline]);
   

  useEffect(() => {
    const handleOnline = () => {
      if (!hasReloadedOnline) {
        clearCache().then(() => {
          sethasReloadedOnline(true);
          window.location.reload();
        });
      }
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, [hasReloadedOnline]);

  const renderStoryList = (title, stories, showNumber = false, onCardClick) => (
    <div>
      <h2>{title}</h2>
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "10px",
          paddingBottom: "12px",
        }}
      >
        {Array.isArray(stories) &&
          stories.map((story, index) => (
            <div
              key={story.id || index}
              style={{
                minWidth: "150px",
                flexShrink: 0,
                padding: "8px",
                background: "white",
                borderRadius: "10px",
                textAlign: "center",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                transition: "transform 0.2s ease-in-out",
              }}
              onClick={() => onCardClick(story.id, stories)}
            >
              {showNumber && (
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {index + 1}
                </div>
              )}
              <img
                src={story.coverImage || "https://picsum.photos/900/300"}
                alt={story.title}
                style={{
                  width: "170px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "3px",
                  marginBottom: "3px",
                }}
              />
              <p>{story.title}</p>
              <small>{story.genre}</small>
            </div>
          ))}
      </div>
    </div>
  );

  const handelCardClick = (bookId, rowBooks) => {
    setSelectedBookId(bookId);
    setBooksInRow(rowBooks);
    setShowModal(true);
  };

  return (
    <div className="home-app">
    <Header />
      
    <div className="home-container">
      {!isOnline && (
        <div
          style={{
            background: "#ffcccc",
            color: "#990000",
            textAlign: "center",
            padding: "10px",
            fontWeight: "bold",
          }}
        >
          ⚠️ You’re offline. Some features may not work properly.
        </div>
      )}
      <RotatingBanner />
      {renderStoryList(
        "Top Picks for You",
        topPicks?.length ? topPicks : [],
        false,
        handelCardClick
      )}
      {renderStoryList(
        "Top 10 in the U.S.",
        topUS?.length ? topUS : [],
        true,
        handelCardClick
      )}
      {Object.keys(trendingByGenre).map((genre) => (
        <div key={genre}>
          {renderStoryList(
            `Trending in ${genre}`,
            trendingByGenre[genre]?.length ? trendingByGenre[genre] : [],
            false,
            handelCardClick
          )}
        </div>
      ))}

      

      {showModal && (
        <BookPreviewModal
          books={booksInRow}
          selectedBookId={selectedBookId}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
    <footer className="welcome-footer">© 2025 Novella</footer>
    </div>
  );
};

export default Home;
