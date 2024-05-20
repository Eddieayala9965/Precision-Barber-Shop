import { useState } from "react";
import Button from "@mui/material/Button";
import { Alert, Snackbar } from "@mui/material";

function DeleteServiceButton({ serviceId }) {
  const [error, setError] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleDelete = async () => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/delete_service/${serviceId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete service. " + (await response.json()).detail
        );
      }

      setDeleted(true);
      setOpenSnackbar(true);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Button variant="contained" color="error" onClick={handleDelete}>
        Delete Service
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Service deleted successfully"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
}

export default DeleteServiceButton;
