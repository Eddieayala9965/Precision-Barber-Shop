import { useAvatar } from "../context/AvatarContext";
import Button from "@mui/material/Button";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Cookies from "js-cookie";

const DeleteAvatarButton = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const { refetch } = useAvatar();

  const handleDelete = async () => {
    const userId = Cookies.get("user_id");
    if (!userId) {
      console.error("User ID is missing.");
      setSnackbarMessage("User ID is missing.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const filePath = `${userId}/avatar.jpg`;
    const url = `${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/avatars/${filePath}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
        apiKey: import.meta.env.VITE_SUPABASE_KEY,
      },
    });

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      console.error(message);
      setSnackbarMessage(`Failed to delete avatar: ${message}`);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } else {
      setSnackbarMessage("Avatar deleted successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      refetch();
    }
  };

  return (
    <>
      <Button onClick={handleDelete} variant="contained" color="error">
        Delete Avatar
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DeleteAvatarButton;
