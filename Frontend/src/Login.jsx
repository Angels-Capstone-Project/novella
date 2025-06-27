import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import { BASE_URL } from "./utils/api";



function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/login`, {
        email: formData.email,
        password: formData.password,
      });

      console.log("Login success:", res.data);
      alert("Login successful!");

      localStorage.setItem("userId", res.data.user.id);

      navigate("/home");

      // TODO: save user info
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed. Check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Log in</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Login</button>
      <p style ={{marginTop: "1rem"}}>
        Don't have an account? <Link to ="/signup">Sign Up</Link>
      </p>
    </form>
  );
};

export default Login;
