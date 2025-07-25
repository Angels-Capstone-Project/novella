import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/api";
import "./ProfilePage.css";


const ProfilePage = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const id = userId || localStorage.getItem("userId");
    if (id) {
      axios
        .get(`${BASE_URL}/profile/${id}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error("Error loading profile:", err));
    }
  }, [userId]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2>Profile Information</h2>
      <p>
        <strong>Name:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Birthday:</strong>{" "}
        {new Date(user.birthday).toLocaleDateString()}
      </p>
      <p>
        <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default ProfilePage;
