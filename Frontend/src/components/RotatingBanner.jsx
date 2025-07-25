import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RotatingBanner.css";
import { useTooltip } from "./TooltipContext.jsx";

const bannerData = [
  {
    image: "https://picsum.photos/900/300?random=1",
    title: "He swore off volleyball...",
    description:
      "Then he met the teammate. His twin’s best friend. The boy who makes him brave.",
  },
  {
    image: "https://picsum.photos/900/300?random=2",
    title: "He's danger on wheels.",
    description:
      "What's more reckless than racing? Falling for Grayson Maddox.",
  },
  {
    image: "https://picsum.photos/900/300?random=3",
    title: "“They weren’t you — and that was the problem.”",
    description:
      "Grayson never forgot her. Now she’s finally seeing him. Emotional & beloved with 2.3M reads.",
  },
];

const RotatingBanner = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

const { showTooltip, updatePosition, hideTooltip } = useTooltip();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { image, title, description } = bannerData[currentIndex];

  return (
    <div className="banner">
      <img src={image} alt="Banner" className="banner-image" />
      <div className="banner-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <button
          className="read-now-button"
          onClick={() => navigate("/read/:bookId")}
          onMouseEnter={(e) => {
            console.log("Hovered");
            showTooltip("Click to start reading this story", e)
          }}
          onMouseMove={(e) =>
            showTooltip("Click to start reading this story", e)
          }
          onMouseLeave={hideTooltip}
        >
          READ NOW
        </button>
      </div>
    </div>
  );
};

export default RotatingBanner;
