import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const Home = () => {
  return (
    <Container
      sx={{
        backgroundColor: "#1f1f1f",
        color: "white",
        minHeight: "100vh ",
        minWidth: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
        }}
        href="https://squareup.com/appointments/book/7djpzd51grujsb/LXEFMT6HSK5S4/start"
        target="_top"
        rel="nofollow"
      >
        Book Now
      </Button>
    </Container>
  );
};

export default Home;
