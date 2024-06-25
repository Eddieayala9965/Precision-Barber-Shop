import React from "react";
import Hero from "../images/Hero.jpg";
import Elbee from "../images/Elbee.png";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Home = () => {
  return (
    <Container disableGutters maxWidth={false} sx={{ padding: 0, margin: 0 }}>
      <Box
        sx={{
          width: "100%",
          minHeight: "80vh",
          backgroundImage: `url(${Hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
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
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the color and opacity for your desired tint
            zIndex: 1,
          },
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#f50057",
            color: "white",
            height: 40,
            textTransform: "uppercase",
            letterSpacing: 1,
            lineHeight: 38,
            padding: "0 28px",
            borderRadius: 8,
            fontWeight: 500,
            fontSize: 14,
            cursor: "pointer",
            zIndex: 2, // Ensure the button is above the overlay
          }}
          href="https://squareup.com/appointments/book/7djpzd51grujsb/LXEFMT6HSK5S4/start"
          target="_top"
          rel="nofollow"
        >
          Book Now
        </Button>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "20vh",
        }}
      />
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
            padding: 0,
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              padding: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={Elbee}
              alt="Placeholder"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: 8,
              }}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              padding: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to Precision Barbershop
            </Typography>
            <Typography variant="body1" gutterBottom>
              Since 2017, Precision Barbershop has been a cornerstone of our
              community, offering unparalleled grooming services with a
              commitment to excellence and precision. We pride ourselves on
              providing top-notch haircuts and a welcoming atmosphere where
              every client feels valued and appreciated.
            </Typography>
            <Typography variant="body1" gutterBottom>
              Our team of skilled barbers has years of experience in the
              industry. Each barber is trained in the latest techniques and
              trends, ensuring you receive a modern and stylish cut every time.
              We understand the importance of a perfect cut, and our barbers
              take the time to listen to your needs and deliver exactly what you
              want with meticulous attention to detail.
            </Typography>
            <Typography variant="body1">
              Ready for your next haircut? Booking an appointment at Precision
              Barbershop is easy. Use our online booking system to select a time
              that works best for you, and we’ll take care of the rest.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default Home;
