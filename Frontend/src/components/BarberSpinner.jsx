import React from "react";
import { keyframes } from "@emotion/react";

// Define the spin keyframes for rotation
const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Define the animatedBackground keyframes for background scrolling
const animatedBackground = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: -100% 0;
  }
`;

const BarberPoleSpinner = () => {
  const stripesStyle = {
    width: "300px", // Width of the spinner
    height: "300px", // Height of the spinner
    borderRadius: "1em", // Rounded corners
    padding: "0.5em 1em",
    background:
      "repeating-linear-gradient(120deg, red 33%, white 33.5%, white 66%, blue 66.5%)",
    backgroundSize: "5000%", // Ensures a smooth gradient repeat
    animation: `${spin} 2s linear infinite, ${animatedBackground} 10s linear infinite`,
  };

  return <div style={stripesStyle}></div>;
};

export default BarberPoleSpinner;
