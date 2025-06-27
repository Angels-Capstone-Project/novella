import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/api.js";
x;

const genres = ["Romance", "Fantasy", "Mystery", "Sci-Fi", "Thriller"];

const Home = ({ userId }) => {
  const [topPicks, setTopPicks] = useState([]);
  const [topUS, setTopUS] = useState([]);
  const [trendingByGenre, setTrendingByGenre] = useState({});

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

  const renderStoryList = (title, stories, showNumber = false) => (
    <div>
      <h2>{title}</h2>
      <div style={{ display: "flex", overflowX: "scroll", gap: "10px" }}>
        {Array.isArray(stories) &&
          stories.map((story, index) => (
            <div
              key={story.id || index}
              style={{
                minWidth: "150px",
                padding: "10px",
                background: "#f4f4f4",
                borderRadius: "6px",
                textAlign: "center",
              }}
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
  return (
    <div style={{ padding: "20px" }}>
      {renderStoryList("Top Picks for You", topPicks?.length ? topPicks : [])}
      {renderStoryList("Top 10 in the U.S.", topUS?.length ? topUS : [], true)}
      {Object.keys(trendingByGenre).map((genre) => (
        <div key={genre}>
          {renderStoryList(
            `Trending in ${genre}`,
            trendingByGenre[genre]?.length ? trendingByGenre[genre] : []
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
