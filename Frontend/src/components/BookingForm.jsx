import React, { useState, useEffect } from "react";
import { supabase } from "../utils/Supabase";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Container,
  Box,
} from "@mui/material";

function BookingForm() {
  const [formData, setFormData] = useState({
    barber_id: "",
    service_id: "",
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    booking_date: "",
  });

  const [bookingTime, setBookingTime] = useState("");

  const [barberServices, setBarberServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchBarberServices = async () => {
      const url = "http://127.0.0.1:8000/barber_service";
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("Fetched barbers and services", data.data);
      setBarberServices(data.data);

      // Extract unique barbers and services
      const uniqueBarbers = [
        ...new Map(data.data.map((item) => [item.barber_id, item])).values(),
      ];
      setBarbers(uniqueBarbers);

      return data.data;
    };
    fetchBarberServices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "barber_id") {
      const filteredServices = barberServices.filter(
        (bs) => bs.barber_id === value
      );
      setServices(filteredServices);
    }
  };

  const handleTimeChange = (e) => {
    setBookingTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Combine date and time
    const combinedDateTime = `${formData.booking_date}T${bookingTime}`;
    const { data, error } = await supabase.rpc("insert_booking_appointment", {
      barber_id: formData.barber_id,
      service_id: formData.service_id,
      customer_name: formData.customer_name,
      customer_phone: formData.customer_phone,
      customer_email: formData.customer_email,
      booking_date: combinedDateTime,
    });

    if (error) {
      console.error("Error creating booking:", error);
    } else {
      console.log("Booking created successfully:", data);
    }
  };

  // Convert 24-hour time to 12-hour time with AM/PM
  const convertTo12Hour = (time) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const suffix = hour >= 12 ? "PM" : "AM";
    const adjustedHour = hour % 12 || 12; // Converts "00" to "12"
    return `${adjustedHour}:${minutes} ${suffix}`;
  };

  const timeOptions = [
    "00:00",
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
  ].map(convertTo12Hour); // Convert all time options to 12-hour format

  return (
    <Container maxWidth="sm">
      <Box
        sx={{ mt: 4, mb: 4, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Barber</InputLabel>
            <Select
              name="barber_id"
              value={formData.barber_id}
              onChange={handleChange}
              label="Barber"
            >
              <MenuItem value="">
                <em>Select Barber</em>
              </MenuItem>
              {barbers.map((barber) => (
                <MenuItem key={barber.barber_id} value={barber.barber_id}>
                  {barber.barber_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Service</InputLabel>
            <Select
              name="service_id"
              value={formData.service_id}
              onChange={handleChange}
              label="Service"
            >
              <MenuItem value="">
                <em>Select Service</em>
              </MenuItem>
              {services.map((service) => (
                <MenuItem key={service.service_id} value={service.service_id}>
                  {service.service_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            name="customer_name"
            label="Customer Name"
            value={formData.customer_name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="customer_phone"
            label="Customer Phone"
            value={formData.customer_phone}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            name="customer_email"
            label="Customer Email"
            value={formData.customer_email}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            type="date"
            name="booking_date"
            label="Booking Date"
            InputLabelProps={{ shrink: true }}
            value={formData.booking_date.split("T")[0]} // Only take the date part
            onChange={(e) =>
              setFormData({ ...formData, booking_date: e.target.value })
            }
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Booking Time</InputLabel>
            <Select
              name="booking_time"
              value={bookingTime}
              onChange={handleTimeChange}
              label="Booking Time"
            >
              {timeOptions.map((time, index) => (
                <MenuItem key={index} value={time}>
                  {time}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Create Booking
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default BookingForm;
