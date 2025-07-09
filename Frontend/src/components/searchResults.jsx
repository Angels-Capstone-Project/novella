import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/api";
import "./searchResults.css";
import Header from "./Header";

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
    <>
    <Header/>
    <div className="search-results-page">
      <h2 className="results-heading">Search results for: “{query}”</h2>
      <div className="results-list">
        {results.map((story) => (
          <div key={story.id} className="result-card">
            <img
              src={story.coverImage || "https://via.placeholder.com/100x150"}
              alt={story.title}
              className="result-cover"
            />
            <div className="result-info">
              <h3 className="result-title">{story.title}</h3>
              <p className="result-author">by {story.author?.username}</p>
              <p className="result-genre">{story.genre}</p>
              <p className="result-snippet">
                {story.description?.slice(0, 120)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default SearchResults;
