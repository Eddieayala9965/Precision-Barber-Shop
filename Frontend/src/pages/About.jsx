import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const About = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Precision Barbershop has been serving the community since 2017,
          providing expert grooming services with a focus on quality and
          customer satisfaction.
        </Typography>
        <Typography variant="body1" paragraph>
          Our team of skilled barbers is dedicated to offering the best
          experience possible with every visit. We believe in the art of
          grooming and the transformation it can bring to every individual who
          walks through our doors.
        </Typography>
        <Typography variant="body1" paragraph>
          Located in the heart of Middletown, NY, our shop offers a modern,
          comfortable setting for you to relax and enjoy a premium barber
          service.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
