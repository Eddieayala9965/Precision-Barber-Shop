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
  Button,
  useMediaQuery,
  useTheme,
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(930));

  return (
    <Box display="flex" flexDirection="column" alignItems="center" p={2}>
      {barberData.map((barber) => (
        <Card
          key={barber.id}
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            width: isMobile ? "80%" : "100%",
            maxWidth: "900px",
            borderRadius: 2,
            boxShadow: 3,
            overflow: "hidden",
            marginBottom: 4,
            backgroundColor: "white",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: isMobile ? "100%" : "50%",
              position: "relative",
              overflow: "hidden",
              borderTopLeftRadius: 2,
              borderBottomLeftRadius: isMobile ? 0 : 2,
              boxShadow: 3,
              aspectRatio: "1 / 1", // Aspect ratio 1:1 for square
            }}
          >
            <CardMedia
              component="img"
              alt={`${barber.name} avatar`}
              image={barber.avatar_url}
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: isMobile ? "100%" : "50%",
              padding: 4,
            }}
          >
            <CardContent>
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
              <Box
                sx={{
                  width: "100%",
                  height: "300px", // Set a fixed height for the carousel container
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  mt: 2,
                }}
              >
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  infiniteLoop
                  useKeyboardArrows
                  style={{ width: "100%", height: "100%" }}
                >
                  {barber.images.map((url, index) => (
                    <div
                      key={index}
                      style={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "300px",
                      }}
                    >
                      <img
                        src={url}
                        alt={`${barber.name} image ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover", // Ensure the image covers the container without being cut off
                        }}
                      />
                    </div>
                  ))}
                </Carousel>
              </Box>
              <Box mt={2} display="flex" justifyContent="center">
                <Button variant="contained" color="primary" href="#">
                  Start Now
                </Button>
              </Box>
            </CardContent>
          </Box>
          <IconButton
            aria-label="instagram"
            component="a"
            href={barber.instagram_link}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ position: "absolute", bottom: 16, right: 16 }}
          >
            <InstagramIcon />
          </IconButton>
        </Card>
      ))}
    </Box>
  );
};

export default BarberGallery;
