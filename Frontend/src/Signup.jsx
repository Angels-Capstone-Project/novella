import React,{ useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    pronouns: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 10) {
      alert("Password must be at least 10 characters long.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match. ");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/register", {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        pronouns: formData.pronouns,
        birthday: `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`,
      });

      console.log("Success!", response.data);
      alert("Signup successful")
      
    } catch (error) {
      alert(error.response?.data?.error||"Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2> Create an account</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <div className="birth-section">
        <label>Birthday</label>
        <div className="birth-inputs">
          <input
            type="text"
            name="birthDay"
            placeholder="DD"
            value={formData.birthDay}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="birthMonth"
            placeholder="MM"
            value={formData.birthMonth}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="birthYear"
            placeholder="YYYY"
            value={formData.birthYear}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <select name="pronouns" value={formData.pronouns} onChange={handleChange}>
        <option value="">Pronouns(optional)</option>
        <option value="she/her">She/Her</option>
        <option value="he/him">He/Him</option>
        <option value="they/them">They/Them</option>
        <option value="prefer-not">Prefer not to say</option>
      </select>

      <input
        type="password"
        name="password"
        placeholder="password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Re-enter Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />

      <button type="submit">Sign Up</button>

      <p style ={{marginTop: "1rem"}}>
        Already have an account? <Link to ="/login">Login in</Link>
      </p>

    </form>
  );
};

export default Signup;

// TODO: redirect to login after sign up
