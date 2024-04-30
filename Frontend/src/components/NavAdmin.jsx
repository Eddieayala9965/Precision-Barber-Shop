import React, { useState } from "react";
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
  Box,
  IconButton,
} from "@mui/material";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import BadgeAvatars from "./BadgeAvatar";
import BarberIcon from "./Icons/BarberIcon";
import ServiceIcon from "./Icons/ServiceIcon";
import AppointmentIcon from "./Icons/AppointmentIcon";
import Logo from "../assets/Logo.png";
import "@fontsource/roboto/500.css";

const NavAdmin = ({ navItems }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      {/* Add an icon button to toggle the drawer */}
      <IconButton onClick={toggleDrawer}>
        <MenuIcon />
      </IconButton>

      {/* Drawer component */}
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
                      {link.title === "Login" && <LoginOutlinedIcon />}
                      {link.title === "Sign Up" && <HistoryEduOutlinedIcon />}
                      {link.title === "Barbers" && <BarberIcon />}
                      {link.title === "Services" && <ServiceIcon />}
                      {link.title === "Logout" && <LogoutOutlinedIcon />}
                      {link.title === "Appointments" && <AppointmentIcon />}
                    </ListItemIcon>
                    <ListItemText primary={link.title} />
                  </ListItemButton>
                </ListItem>
                {index < navItems.length - 1 && <Divider />}
              </div>
            ))}

            <div className="flex justify-center mt-12">
              <BadgeAvatars />
            </div>
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
