import React, { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "../utils/Supabase";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const BarberGallery = () => {
  const [barberData, setBarberData] = useState([]);

  useEffect(() => {
    const fetchBarberData = async () => {
      try {
        const barberResponse = await axios.get(
          "http://127.0.0.1:8000/barber_details"
        );
        const barberData = barberResponse.data.data;

        const combinedData = await Promise.all(
          barberData.map(async (barber) => {
            const { data: files, error } = await supabase.storage
              .from("img")
              .list(barber.id);

            if (error) {
              console.error(
                "Error fetching data for Barber ID",
                barber.id,
                ":",
                error.message
              );
              return { ...barber, images: [], avatar_url: null };
            }

            const image_urls = files.map((file) => {
              const publicURL = `https://juowekkvvwyquoqoarfr.supabase.co/storage/v1/object/public/img/${barber.id}/${file.name}`;
              return publicURL;
            });

            const avatarUrl = `https://juowekkvvwyquoqoarfr.supabase.co/storage/v1/object/public/avatars/${barber.id}/avatar.jpg`;

            return {
              ...barber,
              images: image_urls,
              avatar_url: avatarUrl,
            };
          })
        );

        setBarberData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBarberData();
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      {barberData.map((barber) => (
        <Card
          key={barber.id}
          style={{
            marginBottom: "20px",
            width: "100%",
            maxWidth: "900px",
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <CardMedia
            component="img"
            alt={`${barber.name} avatar`}
            height="auto"
            image={barber.avatar_url}
            style={{ width: "50%", objectFit: "cover" }}
          />
          <CardContent style={{ flex: 1, padding: "20px" }}>
            <Typography variant="h5" component="div" gutterBottom>
              {barber.name}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              {barber.bio}
            </Typography>
            <Box display="flex" justifyContent="center" mb={2}>
              <IconButton
                aria-label="instagram"
                component="a"
                href={barber.instagram_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </IconButton>
            </Box>
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              useKeyboardArrows
            >
              {barber.images.map((url, index) => (
                <div key={index}>
                  <img
                    src={url}
                    alt={`${barber.name} image ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "300px", // Set a fixed height for consistency
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default BarberGallery;
