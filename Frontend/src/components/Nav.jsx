import * as React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

const Nav = ({ navItems }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: 2,
        position: "fixed",
        zIndex: 1200,
        top: 0,
        left: 0,
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&.MuiBox-root": {
          padding: 0,
        },
        borderBottom: { xs: "2px solid white", md: "none" }, // Border bottom for small screens only
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              sx={{
                display: { md: "none" },
                color: "white",
                "&.MuiIconButton-root": {
                  padding: 0, // Override IconButton padding
                },
                "&.MuiIconButton-sizeLarge": {
                  padding: 0, // Override IconButton sizeLarge padding
                },
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
              textAlign: "center",
              flexGrow: 1,
              mx: { xs: 0, md: "auto" },
              whiteSpace: "normal", // Enable word wrap
              wordBreak: "break-word", // Enable word wrap
            }}
          >
            Precision Barber Shop
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              "&.MuiBox-root": {
                padding: 0,
              },
            }}
          >
            {navItems.map((link, index) => (
              <Button
                key={`${link.title}-${index}`}
                component={Link}
                to={link.path}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  ml: 1,
                  fontFamily: "'Montserrat', sans-serif",
                  "&.MuiButtonBase-root": {
                    padding: 0, // Override button padding
                  },
                }}
              >
                {link.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, padding: 0 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {navItems.map((link, index) => (
              <React.Fragment key={index}>
                <ListItem button component={Link} to={link.path}>
                  <ListItemText primary={link.title} />
                </ListItem>
                {index < navItems.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

Nav.propTypes = {
  navItems: PropTypes.array.isRequired,
};

export default Nav;
