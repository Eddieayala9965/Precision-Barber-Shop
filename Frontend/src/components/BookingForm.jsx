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

  const getTimeOptions = (date) => {
    const dayOfWeek = new Date(date).getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6
    let startTime = 10; // Start time for all days except Monday
    let endTime;

    switch (dayOfWeek) {
      case 1: // Monday
        return []; // Closed on Mondays
      case 2: // Tuesday
      case 3: // Wednesday
      case 4: // Thursday
      case 0: // Sunday
        endTime = 18; // 6 PM end time
        break;
      case 5: // Friday
      case 6: // Saturday
        endTime = 19; // 7 PM end time
        break;
      default:
        endTime = 18; // Default end time
    }

    let times = [];
    for (let hour = startTime; hour < endTime; hour++) {
      times.push(`${hour}:00`, `${hour}:30`);
    }
    times.push(`${endTime}:00`); // Add the closing time slot

    return times.map(convertTo12Hour);
  };

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
            onChange={(e) => {
              const selectedDate = new Date(e.target.value);
              const dayOfWeek = selectedDate.getDay(); // Sunday - 0, Monday - 1, ..., Saturday - 6

              if (dayOfWeek === 1) {
                // Check if the selected day is Monday
                alert("Bookings are not available on Mondays.");
                setFormData({ ...formData, booking_date: "" }); // Reset the date
              } else {
                setFormData({ ...formData, booking_date: e.target.value });
              }
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Booking Time</InputLabel>
            <Select
              name="booking_time"
              value={bookingTime}
              onChange={handleTimeChange}
              label="Booking Time"
            >
              {formData.booking_date &&
                getTimeOptions(formData.booking_date).map((time, index) => (
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
