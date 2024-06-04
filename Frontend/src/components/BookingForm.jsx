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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function BookingForm() {
  const [formData, setFormData] = useState({
    barber_id: "",
    service_id: "",
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    booking_date: "",
  });

  const [bookingTime, setBookingTime] = useState(null);
  const [bookingDate, setBookingDate] = useState(null);

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

  const handleDateChange = (newValue) => {
    setBookingDate(newValue);
  };

  const handleTimeChange = (newValue) => {
    setBookingTime(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const combinedDateTime = dayjs(bookingDate)
      .hour(dayjs(bookingTime).hour())
      .minute(dayjs(bookingTime).minute())
      .second(0)
      .toISOString();
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

  // Disable Mondays and other specific days
  const shouldDisableDate = (date) => {
    const day = date.day();
    return day === 1; // Disable Mondays (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  };

  // Set min and max time based on the selected date
  const getMinTime = () => {
    const day = bookingDate ? bookingDate.day() : null;
    if (day === 5 || day === 6) {
      // Friday, Saturday
      return dayjs().hour(10).minute(0);
    } else {
      // Sunday, Tuesday, Wednesday, Thursday
      return dayjs().hour(10).minute(0);
    }
  };

  const getMaxTime = () => {
    const day = bookingDate ? bookingDate.day() : null;
    if (day === 5 || day === 6) {
      // Friday, Saturday
      return dayjs().hour(19).minute(0);
    } else {
      // Sunday, Tuesday, Wednesday, Thursday
      return dayjs().hour(18).minute(0);
    }
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Booking Date"
              value={bookingDate}
              onChange={handleDateChange}
              shouldDisableDate={shouldDisableDate}
              renderInput={(params) => (
                <TextField fullWidth margin="normal" {...params} />
              )}
            />
            <TimePicker
              label="Booking Time"
              value={bookingTime}
              onChange={handleTimeChange}
              minTime={getMinTime()}
              maxTime={getMaxTime()}
              minutesStep={30}
              renderInput={(params) => (
                <TextField fullWidth margin="normal" {...params} />
              )}
            />
          </LocalizationProvider>
          <Button type="submit" variant="contained" color="primary">
            Create Booking
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default BookingForm;
