import { Form, redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  TextField,
  Button,
  Container,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import GlobalLoadingSpinner from "../components/GlobalLoadingSpinner";
import { useLoading } from "../context/LoadingContext";
import Box from "@mui/material/Box";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const data = { email, password };
  const url = import.meta.env.VITE_BARBER_LOGIN;

  const userLogin = async (data) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error("Invalid Password or Email");
      }
      const data = await response.json();
      const { session, user } = data;

      // Clear cookies first
      Cookies.remove("user_id");
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("expires_at");
      Cookies.remove("first_name");

      const secureOptions = {
        expires: 1 / 24,
        secure: true,
        sameSite: "Strict",
      };

      Cookies.set("user_id", user.id, secureOptions);
      Cookies.set("access_token", session.access_token, secureOptions);
      Cookies.set("refresh_token", session.refresh_token, secureOptions);
      Cookies.set("expires_at", session.expires_at, secureOptions);
      Cookies.set("first_name", user.first_name, secureOptions);

      return { success: true, message: "Login Successful" };
    } catch (error) {
      return { success: false, message: "Invalid password or email" };
    }
  };

  const result = await userLogin(data);
  if (result.success) {
    redirect("/admin/profile");
  }
  return result;
};

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, setIsLoading } = useLoading();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    setIsLoading(true);

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [setIsLoading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const data = { email, password };

    const result = await action({ request: { formData: () => formData } });
    setSnackbar({
      open: true,
      message: result.message,
      severity: result.success ? "success" : "error",
    });

    if (result.success) {
      redirect("/admin/profile");
    }
  };

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

          <Form method="POST" onSubmit={handleSubmit}>
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AdminLogin;
