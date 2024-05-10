import { useLoaderData } from "react-router-dom";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Logo2 from "../images/Logo2.png";
import HeadShot from "../images/headshot.jpeg";
import UploadImage from "../components/UploadImage";
import BarberPhoto from "../images/Elbee.png";
import BarberPhoto2 from "../images/Elbee2.png";
import BarberPhoto3 from "../images/Person1.jpeg";
import BarberPhoto4 from "../images/Person2.jpeg";
import BarberPhoto5 from "../images/Person3.jpg";
import BarberPhoto6 from "../images/Person4.jpeg";
import BarberPhoto7 from "../images/Person5.png";
import BarberPhoto8 from "../images/Person6.png";
import BarberPhoto9 from "../images/Person7.jpeg";
import BarberPhoto10 from "../images/Person8.png";
import BarberPhoto11 from "../images/Person9.png";
import BarberPhoto12 from "../images/Person10.png";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

import Box from "@mui/material/Box";

export const loader = async () => {
  const url = "http://127.0.0.1:8000/barbers";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };
  const response = await fetch(url, options);
  const user = await response.json();
  console.log(user.data);
  return { user: user.data };
};

const itemData = [
  {
    img: BarberPhoto,
    title: "Breakfast",
    author: "@bkristastucchio",
    featured: true,
  },
  {
    img: BarberPhoto2,
    title: "Burger",
    author: "@rollelflex_graphy726",
  },
  {
    img: BarberPhoto3,
    title: "Camera",
    author: "@helloimnik",
  },
  {
    img: BarberPhoto4,
    title: "Coffee",
    author: "@nolanissac",
  },
  {
    img: BarberPhoto5,
    title: "Hats",
    author: "@hjrc33",
  },
  {
    img: BarberPhoto6,
    title: "Honey",
    author: "@arwinneil",
    featured: true,
  },
  {
    img: BarberPhoto7,
    title: "Basketball",
    author: "@tjdragotta",
  },
  {
    img: BarberPhoto8,
    title: "Fern",
    author: "@katie_wasserman",
  },
  {
    img: BarberPhoto9,
    title: "Mushrooms",
    author: "@silverdalex",
  },
  {
    img: BarberPhoto10,
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: BarberPhoto11,
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: BarberPhoto12,
    title: "Bike",
    author: "@southside_customs",
  },
];

const Profile = () => {
  const { user } = useLoaderData();

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <UploadImage />
      {user.map((userInfo, index) => (
        <Container
          key={index}
          sx={{
            display: "flex",

            justifyContent: "space-evenly",
            alignItems: "center",
            gap: 2,
            width: "100%",
            "@media (max-width: 1000px)": {
              flexDirection: "column",
            },
          }}
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
              width: "100%",
              boxSizing: "border-box",
              gap: 2,
            }}
            maxWidth="md"
          >
            <Card
              sx={{
                width: "100%",
                maxWidth: 500,
                overflow: "hidden",
                borderRadius: "3%",
              }}
            >
              <CardActionArea sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="275"
                  src={userInfo.profilePicture || Logo2}
                  alt="Profile Picture"
                  sx={{
                    width: "100%",
                    height: 275,
                    display: "flex",
                    justifyContent: "center",
                  }}
                />

                <CardContent>
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Avatar
                      alt={userInfo.first_name}
                      src={userInfo.profile_image}
                      sx={{
                        position: "absolute",
                        width: 80,
                        height: 80,
                        bottom: 45,
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    />
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        margin: 0,
                        textAlign: "center",
                        "&.MuiTypography-root": { margin: 0 },
                      }}
                    >
                      {userInfo.first_name} {userInfo.last_name}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              sx={{
                width: "100%",
                maxWidth: 500,
                height: 260,
                borderRadius: "3%",
              }}
            >
              <CardActionArea
                sx={{
                  height: 260,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    textAlign: "center",
                    padding: 2,
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="body1"
                    component="div"
                    sx={{ whiteSpace: "pre-line" }}
                  >
                    Contact Information:
                    <br />
                    Email: {userInfo.email}
                    <br />
                    Phone: {userInfo.phone}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    Bio:
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ overflow: "auto", maxHeight: "150px" }}
                  >
                    With over a decade of experience in the art of barbering, I
                    specialize in classic cuts, modern fades, and detailed beard
                    trims. My approach combines traditional techniques with
                    contemporary styling, ensuring each client leaves not just
                    looking good, but feeling great. I believe a haircut is not
                    just a service, but an experience - one that should be
                    relaxing and tailored to individual needs. My passion for
                    barbering drives me to stay updated with the latest trends
                    and techniques, ensuring I can offer the best solutions to
                    my clients. Whether you're looking for a subtle change or a
                    complete transformation, I'm here to make it happen with
                    precision and care.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Container>

          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
              width: "100%",
              boxSizing: "border-box",
              gap: 2,
              overflow: "hidden",
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
              {itemData.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  sx={{ display: "flex", justifyContent: "center" }}
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
                        image={item.img}
                        alt={item.title}
                      />
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Container>
      ))}
    </Container>
  );
};

export default Profile;
