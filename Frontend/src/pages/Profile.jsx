import { useQuery } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Logo2 from "../images/Logo2.png";
import { CardActionArea } from "@mui/material";
import Stack from "@mui/material/Stack";
import Gallery from "../components/Gallery";
import UploadAvatar from "../components/UploadAvatar";
import DeleteAvatarButton from "../components/DeleteAvatarButton";
import UpdateBarberButton from "../components/UpdateProfileButton";
import Cookies from "js-cookie";

const fetchProfile = async () => {
  const response = await fetch(import.meta.env.VITE_BARBER_DETAILS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Cookies.get("access_token")}`,
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

  console.log("Is Loading:", isLoading);
  if (isLoading) return;
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
                    {userInfo.first_name && userInfo.last_name ? (
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
                    ) : (
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{
                          margin: 0,
                          textAlign: "center",
                          "&.MuiTypography-root": { margin: 0, marginTop: 2 },
                        }}
                      >
                        No Name Provided
                      </Typography>
                    )}
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
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: 3,
                  maxWidth: "90%",
                  margin: "auto",
                }}
              >
                {userInfo.email || userInfo.phone || userInfo.bio ? (
                  <>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        mb: 1,
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      Contact Information
                    </Typography>
                    <Typography
                      variant="body1"
                      component="p"
                      sx={{
                        mb: 2,
                        fontSize: "0.9rem",
                        color: "#555",
                        lineHeight: 1.5,
                      }}
                    >
                      Email: {userInfo.email}
                      <br />
                      Phone: {userInfo.phone}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        mb: 1,
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        color: "#333",
                      }}
                    >
                      About
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: "auto",
                        maxHeight: "120px",
                        padding: 2,
                        width: "100%",
                        fontSize: "0.85rem",
                        lineHeight: 1.5,
                      }}
                    >
                      {userInfo.bio}
                    </Typography>
                  </>
                ) : (
                  <Typography
                    variant="h4"
                    component="div"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      fontWeight: "bold",
                      color: "#333",
                      textAlign: "center",
                      padding: 3,
                      borderRadius: 1,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Update Barber Information
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Container>

          <Gallery />
        </Container>
      ))}
    </Container>
  );
};

export default Profile;
