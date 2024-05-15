import { useState, useEffect } from "react";
import { Container, Card, CardMedia, Typography, Box } from "@mui/material";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "http://127.0.0.1:8000/services";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setServices(data.data);
    };

    fetchData();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        backgorundColor: "white",
        borderRadius: 15,
        boxShadow: 5,
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: 2,
        marginBottom: 2,
        marginTop: 2,
      }}
    >
      {services.map((service, index) => (
        <Card
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            width: "100%",
            marginBottom: 2,
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={service.image}
            alt={service.name}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
              width: "100%",
            }}
          >
            <Typography variant="h5">{service.service}</Typography>
            <Typography variant="body2">{service.price}</Typography>
          </Box>
        </Card>
      ))}
    </Container>
  );
};

export default Services;
