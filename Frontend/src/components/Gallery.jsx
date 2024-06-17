import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadImage from "./UploadImage";
import { supabase } from "../utils/Supabase";
import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGallery = useCallback(async () => {
    const userId = localStorage.getItem("user_id");
    try {
      const { data, error } = await supabase.storage.from("img").list(userId, {
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
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

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

  if (loading) return <div></div>;
  if (error) return <div>Error: {error}</div>;

  const userId = localStorage.getItem("user_id");
  const supbaseUrl =
    "https://juowekkvvwyquoqoarfr.supabase.co/storage/v1/object/public/img";

  return (
    <Container
      maxWidth="md"
      sx={{ mt: 4, bgcolor: "white", boxShadow: 7, borderRadius: 10 }}
    >
      <Box sx={{ p: 3 }}>
        <div className="flex self-start mb-4">
          <UploadImage fetchGallery={fetchGallery} />
        </div>
        {gallery.length > 0 ? (
          <Grid container spacing={2}>
            {gallery.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{ width: "100%", maxWidth: "100%", borderRadius: "15%" }}
                >
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
        ) : (
          <Card sx={{ mt: 2, textAlign: "center", p: 3 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                No Images Found
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Upload your images now
              </Typography>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default Gallery;
