import { keyframes } from "@emotion/react";
import { Box } from "@mui/material";

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
    width: "200px",
    height: "30px",
    borderRadius: "20px",
    padding: "0.5em 1em",
    background:
      "repeating-linear-gradient(120deg, #FF0000, #FF0000 20px, #FFFFFF 20px, #FFFFFF 40px, #0000FF 40px, #0000FF 60px, #FFFFFF 60px, #FFFFFF 80px)",
    backgroundSize: "1500%",
    animation: ` ${animatedBackground} 10s linear infinite`,
  };

  return <Box sx={stripesStyle}></Box>;
};

export default BarberPoleSpinner;
