import Button from "@mui/material/Button";

const DeleteAvatarButton = () => {
  const handleDelete = async () => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      console.error("User ID is missing.");
      alert("User ID is missing.");
      return;
    }

    const filePath = `${userId}/avatar.jpg`;
    const url = `${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/avatars/${filePath}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        apiKey: import.meta.env.VITE_SUPABASE_KEY,
      },
    });

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      console.error(message);
      alert("Failed to delete avatar: " + message);
    } else {
      alert("Avatar deleted successfully!");
    }
  };

  return (
    <Button onClick={handleDelete} variant="contained" color="error">
      Delete Avatar
    </Button>
  );
};

export default DeleteAvatarButton;
