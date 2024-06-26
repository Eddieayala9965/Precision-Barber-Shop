import React from "react";
import Hero from "../images/Hero.jpg";
import Elbee from "../images/Elbee.png";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const Home = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ padding: 0, margin: 0, fontFamily: "'Montserrat', sans-serif" }}
    >
      <Box
        sx={{
          width: "100%",
          minHeight: "80vh",
          backgroundImage: `url(${Hero})`,
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
              xs: "4rem",
              sm: "7rem",
            },
            fontFamily: "'Montserrat', sans-serif",
          }}
        >
          Precision Barbershop
        </Typography>
        <Button
          variant="contained"
          sx={{
            color: "white",
            backgroundColor: "#f50057",
            height: 40,
            textTransform: "uppercase",
            letterSpacing: 1,
            lineHeight: 38,
            padding: "0 28px",
            borderRadius: 8,
            fontWeight: 500,
            fontSize: 14,
            cursor: "pointer",
            zIndex: 2,
            "&:hover": {
              backgroundColor: "#d4004f",
            },
          }}
          href="https://squareup.com/appointments/book/7djpzd51grujsb/LXEFMT6HSK5S4/start"
          target="_top"
          rel="nofollow"
        >
          Book Now
        </Button>
      </Box>
      <Box sx={{ width: "100%", height: "20vh" }} />
      <Container
        disableGutters
        maxWidth={false}
        sx={{ padding: 0, margin: 0, mt: "-20vh" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: { xs: "80%", md: "40%" },
              padding: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              image={Elbee}
              alt="Barber"
              sx={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: 8,
                boxShadow: 3,
              }}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Welcome to Precision Barbershop
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ marginBottom: 2, fontFamily: "'Montserrat', sans-serif" }}
            >
              Since 2017, Precision Barbershop has been a cornerstone of our
              community, offering unparalleled grooming services with a
              commitment to excellence and precision. We pride ourselves on
              providing top-notch haircuts and a welcoming atmosphere where
              every client feels valued and appreciated.
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{ marginBottom: 2, fontFamily: "'Montserrat', sans-serif" }}
            >
              Our team of skilled barbers has years of experience in the
              industry. Each barber is trained in the latest techniques and
              trends, ensuring you receive a modern and stylish cut every time.
              We understand the importance of a perfect cut, and our barbers
              take the time to listen to your needs and deliver exactly what you
              want with meticulous attention to detail.
            </Typography>
            <Typography
              variant="body1"
              sx={{ marginBottom: 2, fontFamily: "'Montserrat', sans-serif" }}
            >
              Ready for your next haircut? Booking an appointment at Precision
              Barbershop is easy. Use our online booking system to select a time
              that works best for you, and we’ll take care of the rest.
            </Typography>
          </Box>
        </Box>
      </Container>
      <Divider sx={{ my: 4 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-evenly",
          padding: 4,
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Find Us
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            sx={{ marginBottom: 2, fontFamily: "'Montserrat', sans-serif" }}
          >
            93 North St, Middletown, NY 10940
          </Typography>
          <Box
            component="iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3031.825735601089!2d-74.42293268429173!3d41.4485024792594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89dd3c2a57f5b1db%3A0x256df8c2c8a6a7c1!2s93%20North%20St%2C%20Middletown%2C%20NY%2010940%2C%20USA!5e0!3m2!1sen!2sin!4v1629876679188!5m2!1sen!2sin"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></Box>
        </Box>
        <Box sx={{ textAlign: "center", mt: { xs: 4, md: 0 } }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Business Hours
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Tuesday: 10 AM–6 PM
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Wednesday: 10 AM–6 PM
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Thursday: 10 AM–6 PM
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Friday: 10 AM–7 PM
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Saturday: 10 AM–7 PM
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Sunday: 10 AM–6 PM
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Monday: Closed
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ my: 4 }} />
      <Box
        sx={{
          backgroundColor: "#333",
          color: "white",
          padding: 4,
          textAlign: "center",
          fontFamily: "'Montserrat', sans-serif",
        }}
      >
        <Typography
          variant="body1"
          sx={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          © 2024 Precision Barbershop. All Rights Reserved.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            sx={{
              color: "white",
              "&:hover": { color: "#f50057" },
              fontFamily: "'Montserrat', sans-serif",
            }}
            href="https://www.facebook.com"
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
              "&:hover": { color: "#f50057" },
              fontFamily: "'Montserrat', sans-serif",
            }}
            href="https://www.instagram.com"
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

export default Home;
