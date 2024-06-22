import React from "react";
import Hero from "../images/Hero.jpg";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

const Home = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        margin: 0,
        "&.MuiContainer-root": {
          padding: 0,
          margin: 0,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${Hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the color and opacity for your desired tint
            zIndex: 1,
          },
          clipPath: "inset(0 0 80% 0)", // Default for the smallest screen
          "@media (min-width: 200px)": {
            clipPath: "inset(0 0 10% 0)", // Reveal 10% more
          },
          "@media (min-width: 400px)": {
            clipPath: "inset(0 0 10% 0)", // Reveal 10% more
          },
          "@media (min-width: 600px)": {
            clipPath: "inset(0 0 20% 0)", // Reveal 10% more
          },
          "@media (min-width: 800px)": {
            clipPath: "inset(0 0 20% 0)", // Reveal 10% more
          },
          "@media (min-width: 1000px)": {
            clipPath: "inset(0 0 30% 0)", // Reveal 10% more
          },
          "@media (min-width: 1200px)": {
            clipPath: "inset(0 0 30% 0)", // Reveal 10% more
          },
          "@media (min-width: 1400px)": {
            clipPath: "inset(0 0 30% 0)", // Reveal 10% more
          },
          "@media (min-width: 1600px)": {
            clipPath: "inset(0 0 30% 0)", // Full image
          },
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#f50057",
            color: "white",
            height: 40,
            textTransform: "uppercase",
            letterSpacing: 1,
            lineHeight: 38,
            padding: "0 28px",
            borderRadius: 8,
            fontWeight: 500,
            fontSize: 14,
            cursor: "pointer",
            zIndex: 2, // Ensure the button is above the overlay
          }}
          href="https://squareup.com/appointments/book/7djpzd51grujsb/LXEFMT6HSK5S4/start"
          target="_top"
          rel="nofollow"
        >
          Book Now
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
