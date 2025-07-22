import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/api.js";
import BookPreviewModal from "./BookPreviewModal.jsx";
import RotatingBanner from "./RotatingBanner.jsx";
import Header from "./Header.jsx";
import { clearCache } from "../utils/cache.js";
import { fetchWithCache } from "../utils/fetchWithCache";
import useOnlineStatus from "../utils/useOnlineStatus.js";

const Home = ({ userId }) => {
  const [topPicks, setTopPicks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [topUS, setTopUS] = useState([]);
  const [trendingByGenre, setTrendingByGenre] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [booksInRow, setBooksInRow] = useState([]);
  const [hasReloadedOnline, sethasReloadedOnline] = useState(false);
  const isOnline =useOnlineStatus();

  useEffect(() => {
    if (!userId) return;
    {
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
                minWidth: "clamp(120px, 20vw, 160px)",
                flexShrink: 0,
                padding: "10px",
                background: "#f4f4f4",
                borderRadius: "6px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => onCardClick(story.id, stories)}
            >
              {showNumber && (
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                  {index + 1}
                </div>
              )}
              <img
                src={story.coverImage || "https://via.placeholder.com/150"}
                alt={story.title}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "4px",
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
      <Header />
      <RotatingBanner />
      {renderStoryList(
        "Top Picks for You",
        topPicks?.length ? topPicks : [],
        false,
        handelCardClick
      )}
      {renderStoryList(
        "Top 20 in the U.S.",
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

      <footer className="welcome-footer">© 2025 Novella</footer>

      {showModal && (
        <BookPreviewModal
          books={booksInRow}
          selectedBookId={selectedBookId}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Home;
