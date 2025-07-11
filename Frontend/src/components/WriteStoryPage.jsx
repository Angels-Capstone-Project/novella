import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/api.js"; 
import Header from "./Header";
import "./WriteStoryPage.css";

export default function WritePage() {
const { id } = useParams();
const [story, setStory] = useState(null);
const [chapterTitle, setChapterTitle] = useState("Untitled Part 1");
const [content, setContent] = useState("");
const [banner, setBanner] = useState(""); 

useEffect(() => {
const fetchStory = async () => {
try {
const res = await axios.get(`${BASE_URL}/stories/${id}`);
setStory(res.data);
} catch (err) {
console.error("Error fetching story:", err);
}
};

if (id) fetchStory();
}, [id]);

const handleSave = async () => {
try {
await axios.post(`${BASE_URL}/chapters`, {
storyId: id,
title: chapterTitle,
content,
banner, 
});
alert("Chapter saved!");
} catch (err) {
console.error("Error saving chapter:", err);
alert("Something went wrong saving the chapter.");
}
};

return (
    <>
     <Header/>
<div className="write-container">
{/* Story Header */}
<div className="story-header">
{story?.coverImage && (
<img
src={story.coverImage}
alt="Story Cover"
className="story-cover-image"
/>
)}
<div className="story-info">
<h3 className="story-title">{story?.title || "Loading story..."}</h3>
<p className="story-status">Draft • 0 Words • Saved</p>
</div>
</div>


{banner && (
<img src={banner} alt="Chapter Banner" className="chapter-banner" />
)}


<div className="banner-upload">
<input
type="text"
placeholder="Optional: Paste a banner image URL here"
value={banner}
onChange={(e) => setBanner(e.target.value)}
/>
</div>


<input
value={chapterTitle}
onChange={(e) => setChapterTitle(e.target.value)}
placeholder="Chapter Title"
className="chapter-title-input"
/>


<textarea
value={content}
onChange={(e) => setContent(e.target.value)}
placeholder="Type your text"
className="chapter-textarea"
/>


<div className="chapter-actions">
<button className="save-button" onClick={handleSave}>
Save
</button>
<button className="preview-button">Preview</button>
<button className="publish-button">Publish</button>
</div>
</div>
</>
);
}



