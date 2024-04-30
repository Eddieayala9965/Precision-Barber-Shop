import { Form, Link, redirect } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";
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
    const response = await fetch(url, options);
    data = await response.json();
    console.log(data);
    if (response.ok) {
      window.alert("User created successfully");
      return true;
    } else {
      window.alert("Unable to create user");
    }
  };
  // I have change the redirect to make sure the employee is redirected so update thier page
  // going to have to figure out the logic that.
  const signUp = await userSignUp(data);
  return signUp ? redirect("/admin/login") : redirect("/admin/signup");
};
const AdminSignUp = () => {
  return (
    <Container maxWidth="sm">
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
            autoFocus
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            required
            fullWidth
            margin="normal"
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
