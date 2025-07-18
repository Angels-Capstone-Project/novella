import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
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


const App=() => {

  const userId = localStorage.getItem("userId");
  return(
    <Router>
      <Routes>
        <Route path ="/" element = {< WelcomePage />} />
        <Route path = "/signup" element={<Signup />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/home" element = {<Home userId={userId} />} />
        <Route path = "/read/:bookId" element = {<ReadingPage />} />
        <Route path = "/library" element={<LibraryPage />} />
        <Route path ="/search" element= {<SearchResults />} />
        <Route path ="/write/new" element= {<CreateStoryPage />} />
        <Route path ="/write/:id" element= {<WriteStoryPage />} />
         <Route path ="/write/:id/:chapterId" element= {<WriteStoryPage />} />
        <Route path ="/my-stories" element= {<MyStories user={userId} />} />

      </Routes>
    </Router>
  );
}

export default App;