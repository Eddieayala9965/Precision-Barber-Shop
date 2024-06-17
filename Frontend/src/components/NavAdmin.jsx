import { useState } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

import MenuIcon from "@mui/icons-material/Menu";

import BarberIcon from "./Icons/BarberIcon";

import AppointmentIcon from "./Icons/AppointmentIcon";
import Logo from "../images/Logo.png";
import LogoutButton from "./LogoutButton";
import BarberChair from "./Icons/BarberChair";

import "@fontsource/roboto/500.css";

const NavAdmin = ({ navItems }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="flex flex-col ">
      <IconButton
        sx={{
          position: "fixed",
          zIndex: 1,
        }}
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            padding: 2,
          }}
          role="presentation"
          onClick={toggleDrawer}
        >
          <div className="flex flex-col">
            <img src={Logo} alt="Logo" className="w-full h-auto block" />
          </div>

          <List>
            {navItems.map((link, index) => (
              <div key={`${link.title}-${index}`}>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to={link.path}>
                    <ListItemIcon>
                      {link.title === "Bookings"}
                      {link.title === "Login" && <LoginOutlinedIcon />}
                      {link.title === "Barbers" && <BarberChair />}
                      {link.title === "Profile" && <BarberIcon />}
                      {link.title === "Logout" && <LogoutButton />}
                      {link.title === "Appointments" && <AppointmentIcon />}
                    </ListItemIcon>
                    <ListItemText primary={link.title} />
                  </ListItemButton>
                </ListItem>

                {index < navItems.length - 1 && <Divider />}
              </div>
            ))}
            <Divider />
            <div className="mt-5">{<LogoutButton />}</div>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

NavAdmin.propTypes = {
  navItems: PropTypes.array.isRequired,
};

export default NavAdmin;
