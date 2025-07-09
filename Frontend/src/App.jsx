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

      </Routes>
    </Router>
  );
}

export default App;