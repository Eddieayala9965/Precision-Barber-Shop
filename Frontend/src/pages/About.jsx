import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import BgTools from "../images/bg-tools.jpeg";
import Box from "@mui/material/Box";

const About = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ padding: 0, margin: 0 }}>
      <Box
        sx={{
          width: "100%",
          minHeight: "80vh",
          backgroundImage: `url(${BgTools})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: "white",
            zIndex: 2,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 4,
            fontSize: {
              xs: "3rem",
              sm: "4rem",
              md: "6rem",
              lg: "7rem",
            },
          }}
        >
          About Precision BarberShop
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "white",
            maxWidth: "md",
            zIndex: 2,
            fontWeight: 700,
            textAlign: "center",
            marginBottom: 4,
            fontSize: {
              xs: "1rem",
              sm: "1.25rem",
              md: "1.5rem",
            },
            px: 2,
          }}
        >
          Meet our talented team of barbers, each skilled in the latest grooming
          techniques. Explore their work and see why Precision BarberShop is a
          leader in style and innovation. Discover our commitment to quality and
          community in every cut.
        </Typography>
      </Box>
      <Box sx={{ width: "100%", height: "20vh" }} />
      <Divider sx={{ my: 4 }} />
      <Box
        sx={{
          border: "1px solid #ccc",
          boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
          padding: 2,
          px: 2,
          margin: "auto",
          maxWidth: "960px",
          width: "90%",
          minWidth: "300px",
          borderRadius: 7,
          overflow: "hidden",
        }}
      >
        <iframe
          src="https://eec20d7d4ae442f798f5e589762aa450.elf.site"
          width="100%"
          height="600px"
          frameBorder="0"
          style={{ border: "none" }} // Removes the border from the iframe itself
        ></iframe>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Box
        sx={{
          backgroundColor: "#333",
          color: "white",
          padding: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="body1" sx={{ color: "white" }}>
          © 2024 Precision Barbershop. All Rights Reserved.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            sx={{
              color: "white",
              "&:hover": { color: "#1976d2" },
            }}
            href="https://www.facebook.com/elbee.ayala?mibextid=kFxxJD"
            target="_blank"
            rel="noopener"
            startIcon={<FacebookIcon />}
          >
            Facebook
          </Button>
          <Button
            sx={{
              color: "white",
              ml: 2,
              "&:hover": { color: "#1976d2" },
            }}
            href="https://www.instagram.com/anthony_r480?igsh=MXhzemJhcXM0emhjag=="
            target="_blank"
            rel="noopener"
            startIcon={<InstagramIcon />}
          >
            Instagram
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
