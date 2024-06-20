import * as React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

const Nav = ({ navItems }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Adjust this value for desired opacity
        padding: 2,
        position: "fixed", // Change to 'fixed' to keep it on top of other elements
        zIndex: 1200, // Set a high z-index value
        top: 0, // Ensure it stays at the top of the page
        left: 0, // Ensure it stays at the left edge of the page
        height: "70px", // Adjust the height as needed
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white", // Change color to white
              textDecoration: "none",
            }}
          >
            Precision Barber Shop
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navItems.map((link, index) => (
                <MenuItem
                  key={index}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={link.path}
                >
                  <Typography textAlign="center">{link.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
              mr: 35,
            }}
          >
            {navItems.map((link, index) => (
              <Button
                key={`${link.title}-${index}`}
                component={Link}
                to={link.path}
                sx={{ my: 2, color: "white", display: "block", ml: 1 }}
              >
                {link.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </Box>
  );
};

Nav.propTypes = {
  navItems: PropTypes.array.isRequired,
};

export default Nav;
