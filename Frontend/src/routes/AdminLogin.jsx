import { Form, redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, Button, Container, Typography } from "@mui/material";
import GlobalLoadingSpinner from "../components/GlobalLoadingSpinner";
import { useLoading } from "../context/LoadingContext";
import Box from "@mui/material/Box";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const data = { email, password };
  const url = `http://127.0.0.1:8000/login`;

  const userLogin = async (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    data = await response.json();
    const { session, user } = data;
    console.log(data);
    localStorage.clear();
    localStorage.setItem("user_id", user.id);
    localStorage.setItem("access_token", session.access_token);
    localStorage.setItem("refresh_token", session.refresh_token);
    localStorage.setItem("expires_at", session.expires_at);
    if (response.ok) {
      window.alert("Login Succesful");
      return true;
    } else {
      window.alert("Login Failed");
      return false;
    }
  };

  // need to figure out the flow of the redirects and also figure out to change the local storage becuase we cant store data like that in the local storage for security reasons so we need to put it in the context api and then use it from there.
  const loginSuccesful = await userLogin(data);
  return loginSuccesful && redirect("/admin/login");
};

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, setIsLoading } = useLoading();

  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    setIsLoading(true);

    // Simulate a data loading process
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, [setIsLoading]);
  return (
    <>
      <Container maxWidth="lg">
        <div>{isLoading && <GlobalLoadingSpinner />}</div>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>

          <Form method="POST">
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              fullWidth
              margin="normal"
            />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClick} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Form>
        </Box>
      </Container>
    </>
  );
};

export default AdminLogin;
