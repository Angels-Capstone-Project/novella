import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/api.js";
import BookPreviewModal from "./BookPreviewModal.jsx";
import RotatingBanner from "./RotatingBanner.jsx";
import Header from "./Header.jsx"


const genres = ["Romance", "Fantasy", "Mystery", "Sci-Fi", "Thriller", "Drama", "Comedy", "horror"];

const Home = ({ userId }) => {
  const [topPicks, setTopPicks] = useState([]);
  const [topUS, setTopUS] = useState([]);
  const [trendingByGenre, setTrendingByGenre] = useState({});
  const [showModal, setShowModal] =useState(false);
  const [selectedBookId, setSelectedBookId] =useState(null);
  const [booksInRow, setBooksInRow] =useState([]);


  useEffect(() => {
    const fetchTopPicks = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/top-picks/${userId}`);
        setTopPicks(res.data);
      } catch (err) {
        console.error("Error fetching top picks:", err);
      }
    };

    const fetchTopUS = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/top-us`);
        setTopUS(res.data);
      } catch (err) {
        console.error("Error fetching top 10 in the US:", err);
      }
    };

    

    const fetchTrendingByGenre = async () => {
      try {
        const results = await Promise.all(
          genres.map(async (genre) => {
            const res = await axios.get(`${BASE_URL}/genre/${genre}`);
            return { genre, stories: res.data };
          })
        );
        const genreData = {};
        results.forEach(({ genre, stories }) => {
          genreData[genre] = stories;
        });
        setTrendingByGenre(genreData);
      } catch (err) {
        console.error("Error fetching trending stories by genre:", err);
      }
    };

    fetchTopPicks();
    fetchTopUS();
    fetchTrendingByGenre();
  }, [userId]);

  const renderStoryList = (title, stories, showNumber = false, onCardClick) => (
    <div>
      <h2>{title}</h2>
      <div style={{ display: "flex", overflowX: "auto", gap: "10px", paddingBottom: "12px" }}>
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
    <div className = "home-container">
      <Header/>
      <RotatingBanner/>
      {renderStoryList("Top Picks for You", topPicks?.length ? topPicks : [], false, handelCardClick)}
      {renderStoryList("Top 20 in the U.S.", topUS?.length ? topUS : [], true, handelCardClick)}
      {Object.keys(trendingByGenre).map((genre) => (
        <div key={genre}>
          {renderStoryList(
            `Trending in ${genre}`,
            trendingByGenre[genre]?.length ? trendingByGenre[genre] : [], false, handelCardClick
          )}
        </div>
      ))}

      <footer className="welcome-footer">© 2025 Novella</footer>

      { showModal && (
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
