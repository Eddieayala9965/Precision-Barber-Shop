import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

const LogoutButton = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("access_token");

  const handleLogout = async () => {
    try {
      const url = `http://127.0.0.1:8000/logout`;
      const access_token = localStorage.getItem("access_token");

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.ok) {
        localStorage.clear();
        navigate("/admin/login");
      } else {
        alert("Problem logging out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Error logging out. Please try again later.");
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <Button startIcon={<LogoutOutlinedIcon />} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
