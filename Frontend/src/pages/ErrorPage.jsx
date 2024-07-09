import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main", mb: 2 }} />
      <Typography variant="h1" component="h1" gutterBottom>
        404 Not Found
      </Typography>
      <Typography variant="h6" component="p" color="textSecondary" gutterBottom>
        The page you're looking for doesn't exist.
      </Typography>
      <Box mt={4}>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          size="large"
        >
          Go to Home
        </Button>
      </Box>
    </Container>
  );
};

export default ErrorPage;
