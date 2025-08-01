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
  {
    image: "https://picsum.photos/900/300?random=4",
    title: "He swore off basketball...",
    description:
      "Then he met the teammate. His twin’s best friend. The girl who makes him brave.",
  },

  {
    image: "https://picsum.photos/900/300?random=5",
    title: "She broke all his rules — and he liked it.",
    description:
      "He was the ice king of Crestwood High. She melted his walls one smile at a time.",
  },
  {
    image: "https://picsum.photos/900/300?random=6",
    title: "A pact. A kiss. And a summer that changed everything.",
    description:
      "When best friends fake-date to protect each other, the line between pretend and real starts to blur.",
  },
  {
    image: "https://picsum.photos/900/300?random=7",
    title: "She was sunshine. He was the storm.",
    description:
      "No one thought they'd survive each other — but maybe they were exactly what the other needed.",
  },
  {
    image: "https://picsum.photos/900/300?random=8",
    title: "This time, she’s not running.",
    description:
      "He broke her heart once. Now he’s back. And she’s stronger than ever.",
  },
  {
    image: "https://picsum.photos/900/300?random=9",
    title: "He was her brother’s rival. Now he’s her secret.",
    description:
      "She swore she’d stay away from him. But hearts don’t follow rules — and neither does love.",
  },
];

const RotatingBanner = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

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
        >
          READ NOW
        </button>
      </div>
    </div>
  );
};

export default RotatingBanner;
