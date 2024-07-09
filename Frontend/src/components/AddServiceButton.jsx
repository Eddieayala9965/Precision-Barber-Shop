import { useState, useEffect } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import { supabase } from "../utils/Supabase";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "white",
  border: "1px solid #ccc",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const AddServiceButton = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    const userId = Cookies.get("user_id");
    if (accessToken && userId) {
      supabase.auth.setSession({
        access_token: accessToken,
      });
      setUserId(userId);
    } else {
      setError("User is not authenticated");
    }
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (!userId) {
      setError("User is not authenticated");
      return;
    }

    const { data, error } = await supabase.rpc("insert_service_with_duration", {
      p_price: price,
      p_service: service,
      p_barber_id: userId,
      p_duration: duration,
    });

    if (error) {
      console.error("Error:", error);
      setError(error.message);
    } else {
      setService("");
      setPrice("");
      setDuration("");
      handleClose();
      refetch();
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Service
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Add New Service
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Service"
            value={service}
            onChange={(e) => setService(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Duration (in minutes)"
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

AddServiceButton.propTypes = {
  refetch: PropTypes.func.isRequired,
};

export default AddServiceButton;
