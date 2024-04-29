import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import HistoryEduOutlinedIcon from "@mui/icons-material/HistoryEduOutlined";
import BarberIcon from "./Icons/BarberIcon";
import ServiceIcon from "./Icons/ServiceIcon";
import AppointmentIcon from "./Icons/AppointmentIcon";

const NavAdmin = ({ navItems }) => {
  return (
    <>
      <ul>
        <li className={`flex flex-col`}>
          {navItems.map((link, index) => {
            return (
              <ListItem key={`${link.title}-${index}`} disablePadding>
                <ListItemButton component={Link} to={link.path}>
                  <ListItemIcon>
                    {link.title === "Login" && <LoginOutlinedIcon />}
                    {link.title === "Sign Up" && <HistoryEduOutlinedIcon />}
                    {link.title === "Barbers" && <BarberIcon />}
                    {link.title === "Services" && <ServiceIcon />}
                    {link.title === "Appointments" && <AppointmentIcon />}
                  </ListItemIcon>
                  <ListItemText primary={link.title} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </li>
      </ul>
    </>
  );
};

NavAdmin.propTypes = {
  navItems: PropTypes.array,
};

export default NavAdmin;
