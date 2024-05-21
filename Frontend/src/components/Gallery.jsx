import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
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

  const handleDelete = async (imageName) => {
    const userId = localStorage.getItem("user_id");
    const url = `${
      import.meta.env.VITE_SUPABASE_URL
    }/storage/v1/object/img/${userId}/${imageName}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          apiKey: import.meta.env.VITE_SUPABASE_KEY,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error deleting image:", errorData.error);
        throw new Error(errorData.error);
      }

      setGallery(gallery.filter((item) => item.name !== imageName));
    } catch (error) {
      console.error("Failed to delete image:", error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const userId = localStorage.getItem("user_id");
  const supbaseUrl =
    "https://juowekkvvwyquoqoarfr.supabase.co/storage/v1/object/public/img";

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          marginLeft: 1,
          gap: 2,
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
              <Card sx={{ width: "100%", maxWidth: "100%" }}>
                {" "}
                {/* Adjusted maxWidth to 100% */}
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
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      color: "rgba(255, 255, 255, 0.54)",
                    }}
                    onClick={() => handleDelete(item.name)}
                  >
                    <DeleteIcon />
                  </IconButton>
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
