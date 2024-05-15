import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

import { supabase } from "../utils/Supabase";
import { useState, useEffect } from "react";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      const userId = localStorage.getItem("user_id");
      const token = localStorage.getItem("access_token");

      try {
        const { data, error } = await supabase.storage
          .from("img")
          .list(userId, {
            limit: 9,
            offset: 0,
            sortBy: {
              column: "name",
              order: "desc",
            },
          });
        console.log("Fetched data:", data);
        if (error) throw error;
        setGallery(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching gallery:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const userId = localStorage.getItem("user_id");
  const supbaseUrl =
    "https://juowekkvvwyquoqoarfr.supabase.co/storage/v1/object/public/img";
  console.log("Gallery State:", gallery); // Log the state of the gallery

  return (
    <>
      <Container
        sx={{
          display: "flex",

          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          width: "100%",
          boxSizing: "border-box",
          gap: 2,
          "&.MuiContainer-root": { margin: 0, padding: 2, marginLeft: 3 },

          "@media (max-width: 1000px)": {
            width: "500px",
          },
          "@media (max-width: 800px)": {
            width: "400px",
          },
          "@media (max-width: 600px)": {
            width: "350px",
          },
          "@media (max-width: 400px)": {
            width: "330px",
          },
        }}
        maxWidth="md"
      >
        <Grid container spacing={2}>
          {gallery.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",

                padding: 2,
              }}
            >
              <Card sx={{ width: "100%", maxWidth: 400 }}>
                <Box
                  sx={{
                    width: "100%",
                    paddingTop: "100%",
                    position: "relative",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={`${supbaseUrl}/${userId}/${item.name}`}
                    alt={item.name || "Gallery image"}
                  />
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Gallery;
