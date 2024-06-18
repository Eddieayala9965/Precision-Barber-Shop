import Button from "@mui/material/Button";

const Home = () => {
  return (
    <div>
      <Button
        variant="contained"
        style={{
          backgroundColor: "#006aff",
          color: "white",
          height: 40,
          textTransform: "uppercase",
          letterSpacing: 1,
          lineHeight: 38,
          padding: "0 28px",
          borderRadius: 8,
          fontWeight: 500,
          fontSize: 14,
          cursor: "pointer",
        }}
        href="https://squareup.com/appointments/book/7djpzd51grujsb/LXEFMT6HSK5S4/start"
        target="_top"
        rel="nofollow"
      >
        Book Now
      </Button>
    </div>
  );
};

export default Home;
