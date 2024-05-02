import { Outlet } from "react-router-dom";
import NavAdmin from "../components/NavAdmin";
import Box from "@mui/material/Box";

const Admin = () => {
  const primaryNav = [
    { title: "Barbers", path: "/admin/barbers" },
    { title: "Services", path: "/admin/services" },
    { title: "Appointments", path: "/admin/appointments" },
    { title: "Login", path: "/admin/login" },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <NavAdmin navItems={primaryNav} />
      <Outlet />
    </Box>
  );
};

export default Admin;
