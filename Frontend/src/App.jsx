import React, { useState } from "react";
import {BrowserRouter as Router, Routes, Route, useNavigate} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import ReadingPage from "./components/ReadingPage";
import "./App.css";
import WelcomePage from "./components/WelcomePage";
import LibraryPage from "./components/LibraryPage";
import SearchResults from "./components/searchResults";
import CreateStoryPage from "./components/CreateStoryPage";
import WriteStoryPage from "./components/WriteStoryPage";
import MyStories from "./components/MyStories";
import ProfilePage from "./components/ProfilePage";
import { TooltipProvider } from "./components/TooltipContext";
import CustomTooltip from "./components/CustomTooltip";
import LoadingSpinner from "./components/LoadingSpinner";



const App=() => {

  const userId = localStorage.getItem("userId");
  const[loading, setLoading] = useState(false);
  return(
    <>
    {loading && (
      <div className="spinner-overlay">
      <LoadingSpinner message ="loading...." />
      </div>
      )}
    <TooltipProvider>
    <Router>
      <Routes>
        <Route path ="/" element = {< WelcomePage />} />
        <Route path = "/signup" element={<Signup />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/home" element = {<Home userId={userId} setLoading={setLoading}/>} />
        <Route path = "/read/:bookId" element = {<ReadingPage />} />
        <Route path = "/library" element={<LibraryPage setLoading={setLoading}/>} />
        <Route path ="/search" element= {<SearchResults setLoading={setLoading}/>} />
        <Route path ="/write/new" element= {<CreateStoryPage setLoading={setLoading}/>} />
        <Route path ="/write/:id" element= {<WriteStoryPage />} />
         <Route path ="/write/:id/:chapterId" element= {<WriteStoryPage />} />
        <Route path ="/my-stories" element= {<MyStories user={userId} />} />
        <Route path = "/profile" element={<ProfilePage />} />
        
      </Routes>
    </Router>
    <CustomTooltip/>
    </TooltipProvider>
    </>
  );
}

export default App;