import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = ({ message = "Loading..." }) => (
<div className="loading-spinner">
<div className="spinner"></div>
<p>{message}</p>
</div>
);

export default LoadingSpinner;