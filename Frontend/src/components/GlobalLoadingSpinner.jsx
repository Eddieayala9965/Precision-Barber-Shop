import React from "react";
import { Box } from "@mui/material";
import BarberPoleSpinner from "./BarberSpinner";
import { useLoading } from "../context/LoadingContext";

const GlobalLoadingSpinner = () => {
  const { isLoading } = useLoading();

  if (!isLoading) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      }}
    >
      <BarberPoleSpinner />
    </Box>
  );
};

export default GlobalLoadingSpinner;
