import { Form, Link, redirect } from "react-router-dom";
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
  const url = `http://127.0.0.1:8000/register`;

  const userSignUp = async (data) => {
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
        throw new Error(`Server responded with status code ${response.status}`);
      }
      const responseData = await response.json();
      console.log(responseData);
      window.alert("User created successfully");
      return true;
    } catch (error) {
      console.error("Error during user sign up:", error);
      ("Unable to create user. Please try again later.");
      return false;
    }
  };

  // I have change the redirect to make sure the employee is redirected so update thier page
  // going to have to figure out the logic that.
  const signUp = await userSignUp(data);
  return signUp && redirect("/admin/signup");
};
const AdminSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    // Set the loading state to true when the component mounts
    setIsLoading(true);

    // Simulate a data loading process
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeout);
  }, [setIsLoading]);

  const handleClick = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Container maxWidth="lg">
      <div>{isLoading && <GlobalLoadingSpinner />}</div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Sign Up
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
            Sign Up
          </Button>

          <Button component={Link} to="/admin/login" variant="text">
            Already have an account? Login here
          </Button>
        </Form>
      </Box>
    </Container>
  );
};

export default AdminSignUp;
