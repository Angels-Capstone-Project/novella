import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/api";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResults = () => {
  const query = useQuery().get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;
      try {
        const res = await axios.get(`${BASE_URL}/stories?query=${query}`);
        setResults(res.data);
      } catch (err) {
        console.error("Search failed:", err);
      }
    };
    fetchResults();
  }, [query]);

  return (
    <div className="search-results-container">
      <h2>Search results for: “{query}”</h2>
      <div className="results-grid">
        {results.map((story) => (
          <div key={story.id} className="story-card">
            <img
              src={story.coverImage || "https://via.placeholder.com/150"}
              alt={story.title}
            />
            <h3>{story.title}</h3>
            <p>
              <small>By {story.author?.username}</small>
            </p>
            <p>
              <small>{story.genre}</small>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
