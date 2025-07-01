import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ReadingPage from "./components/ReadingPage";
import "./App.css";

const App=() => {

  const userId = localStorage.getItem("userId");
  return(
    <Router>
      <Routes>
        <Route path = "/" element={<Navigate to ="/signup" replace />} />
        <Route path = "/signup" element={<Signup />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/home" element = {<Home userId={userId} />} />
        <Route path = "/read/:bookId" element = {<ReadingPage />} />
      </Routes>
    </Router>
  );
}

export default App;