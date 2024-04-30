import * as React from "react";
import { Outlet } from "react-router-dom";
import NavAdmin from "../components/NavAdmin";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
const drawerWidth = 240;

const Admin = () => {
  const primaryNav = [
    { title: "Barbers", path: "/admin/barbers" },
    { title: "Services", path: "/admin/services" },
    { title: "Appointments", path: "/admin/appointments" },
    { title: "Login", path: "/admin/login" },
    { title: "Logout", path: "/admin/logout" },
    { title: "Sign Up", path: "/admin/signup" },
  ];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <NavAdmin navItems={primaryNav} orientation="vertical" />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Admin;
