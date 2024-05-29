import React, { useState, useEffect } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import { supabase } from "../utils/Supabase";

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
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user_id");
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
    // reason why we are using rpc is because we are calling a stored procedure, meaning we are calling a function that is stored in the database, was having issues with rls and the function was not able to be called from the front end
    const { data, error } = await supabase.rpc("insert_service", {
      p_price: price,
      p_service: service,
      p_barber_id: userId,
    });

    if (error) {
      console.error("Error:", error);
      setError(error.message);
    } else {
      console.log("Data inserted successfully:", data);
      setService("");
      setPrice("");
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

export default AddServiceButton;
