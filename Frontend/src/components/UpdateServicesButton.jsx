import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const UpdateServiceButton = ({ serviceId }) => {
  const [service, setService] = useState("");
  const [price, setPrice] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceData = {
      service: service,
      price: price,
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/update_service/${serviceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify(serviceData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update service: ${errorText}`);
      }

      handleClose();
    } catch (error) {
      console.error("Failed to update service:", error);
      alert(error.message); // Display error to the user
    }
  };

  return (
    <>
      <Button variant="contained" color="warning" onClick={handleClickOpen}>
        Update Service
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Service</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="service"
            label="Service Name"
            type="text"
            fullWidth
            value={service}
            onChange={(e) => setService(e.target.value)}
          />
          <TextField
            margin="dense"
            id="price"
            label="Price"
            type="number"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="success">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateServiceButton;
