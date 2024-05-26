import { useQuery } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Logo2 from "../images/Logo2.png";
import UploadImage from "../components/UploadImage";
import { CardActionArea } from "@mui/material";
import Stack from "@mui/material/Stack";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import UploadAvatar from "../components/UploadAvatar";
import DeleteAvatarButton from "../components/DeleteAvatarButton";
import UpdateBarberButton from "../components/UpdateProfileButton";
import AddServiceButton from "../components/AddServiceButton";

const fetchProfile = async () => {
  const response = await fetch("http://127.0.0.1:8000/barbers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  console.log("Fetched profile data:", data);
  return data;
};

const Profile = () => {
  const {
    data: profileData,
    refetch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["barbers"],
    queryFn: fetchProfile,
    select: (data) => {
      console.log("Selecting profile data:", data);
      return Array.isArray(data.data) ? data.data : [];
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <Container
      sx={{
        display: "flex",
        backgroundColor: "white",
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
      {profileData.map((userInfo, index) => (
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
            <div className="flex self-start gap-3">
              <DeleteAvatarButton />
              <UpdateBarberButton refetch={refetch} />
            </div>

            <Card
              sx={{
                width: "100%",
                maxWidth: 500,
                overflow: "hidden",
                borderRadius: 10,
                boxShadow: 5,
              }}
            >
              <CardActionArea sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="275"
                  src={Logo2}
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
                    <UploadAvatar />

                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        margin: 0,
                        textAlign: "center",
                        "&.MuiTypography-root": { margin: 0, marginTop: 2 },
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
                height: 280,
                borderRadius: 10,
                boxShadow: 7,
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
                  variant="body2"
                  component="p"
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
                  {userInfo.bio}
                </Typography>
              </CardContent>
            </Card>
          </Container>

          <Gallery />
        </Container>
      ))}
      <div className=" ml-7 flex self-start ml-">
        <AddServiceButton />
      </div>

      <Services />
    </Container>
  );
};

export default Profile;
