import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import BadgeAvatars from "./BadgeAvatar";
import BarberIcon from "./Icons/BarberIcon";
import ServiceIcon from "./Icons/ServiceIcon";
import AppointmentIcon from "./Icons/AppointmentIcon";
import Logo from "../assets/Logo.png";
import "@fontsource/roboto/500.css";

const NavAdmin = ({ navItems }) => {
  return (
    <>
      <div className="flex flex-col">
        <img src={Logo} alt="Logo" className=" w-full h-auto block" />
      </div>
      <ul className="flex flex-col">
        {navItems.map((link, index) => {
          return (
            <div key={`${link.title}-${index}`}>
              <ListItem
                key={`${link.title}-${index}`}
                sx={{ fontFamily: '"Roboto", sans-serif' }}
                disablePadding
              >
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
          );
        })}
        <div className="flex justify-center mt-12">
          <BadgeAvatars />
        </div>
      </ul>
    </>
  );
};

NavAdmin.propTypes = {
  navItems: PropTypes.array,
};

export default NavAdmin;
