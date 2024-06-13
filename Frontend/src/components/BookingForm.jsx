import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";

// we have to make sure we adjust the opening and closing times, a person cant make an appointment right as the store closes

dayjs.extend(utc);
dayjs.extend(customParseFormat);

function BookingForm() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    barber_id: "",
    service_id: "",
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    booking_date: null,
  });

  const [bookingTime, setBookingTime] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [services, setServices] = useState([]);

  const { data: barberServicesData, isLoading } = useQuery({
    queryKey: ["barber_service"],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:8000/barber_service");
      const data = await response.json();
      return data.data; // Assuming the correct data is in the `data` property
    },
  });

  const barbers = barberServicesData
    ? [
        ...new Map(
          barberServicesData.map((item) => [item.barber_id, item])
        ).values(),
      ]
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "barber_id") {
      const filteredServices = barberServicesData.filter(
        (bs) => bs.barber_id === value
      );
      setServices(filteredServices);
    }

    if (name === "service_id") {
      setBookingTime("");
      updateAvailableTimes(formData.booking_date, value);
    }
  };

  const handleDateChange = (newValue) => {
    setFormData({
      ...formData,
      booking_date: newValue,
    });
    setBookingTime(""); // Reset booking time when the date changes
    updateAvailableTimes(newValue, formData.service_id); // Update available times when the date changes
  };

  const handleTimeChange = (e) => {
    setBookingTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Parse the booking time from the 12-hour format back to 24-hour format
    const parsedTime = dayjs(bookingTime, "hh:mm A").format("HH:mm");

    // Combine date and time while keeping the timezone in UTC
    const combinedDateTime = dayjs
      .utc(formData.booking_date)
      .hour(dayjs(parsedTime, "HH:mm").hour())
      .minute(dayjs(parsedTime, "HH:mm").minute())
      .second(0)
      .toISOString(); // Converts to ISO format in UTC

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
      queryClient.invalidateQueries(["barber_service"]);
    }
  };

  // Disable Mondays and other specific days
  const shouldDisableDate = (date) => {
    const day = date.day();
    return day === 1; // Disable Mondays (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  };

  // Set min and max time based on the selected date
  const getMinTime = (date) => {
    if (!date) {
      return dayjs().hour(10).minute(0); // Default case if date is null
    }

    const day = date.day();
    if (day === 0 || (day >= 2 && day <= 4)) {
      // Sunday, Tuesday, Wednesday, Thursday
      return dayjs().hour(10).minute(0);
    } else if (day === 5 || day === 6) {
      // Friday, Saturday
      return dayjs().hour(10).minute(0);
    }
    return dayjs().hour(10).minute(0); // Default case
  };

  const getMaxTime = (date) => {
    if (!date) {
      return dayjs().hour(18).minute(0); // Default case if date is null
    }

    const day = date.day();
    if (day === 0 || (day >= 2 && day <= 4)) {
      // Sunday, Tuesday, Wednesday, Thursday
      return dayjs().hour(18).minute(0);
    } else if (day === 5 || day === 6) {
      // Friday, Saturday
      return dayjs().hour(19).minute(0);
    }
    return dayjs().hour(18).minute(0); // Default case
  };

  const updateAvailableTimes = (date, serviceId) => {
    const minTime = getMinTime(date);
    const maxTime = getMaxTime(date);
    const selectedService = services.find(
      (service) => service.service_id === serviceId
    );
    const duration = selectedService ? selectedService.duration : 30;

    let times = [];
    let currentTime = minTime;

    while (currentTime.isBefore(maxTime) || currentTime.isSame(maxTime)) {
      times.push(currentTime.format("hh:mm A")); // Format as 12-hour time with AM/PM
      currentTime = currentTime.add(duration, "minute");
    }

    setAvailableTimes(times);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
                  {service.service_name} - {service.duration} minutes
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
              value={formData.booking_date}
              onChange={handleDateChange}
              shouldDisableDate={shouldDisableDate}
              slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
            />
          </LocalizationProvider>
          <FormControl fullWidth margin="normal">
            <InputLabel>Booking Time</InputLabel>
            <Select
              name="booking_time"
              value={bookingTime}
              onChange={handleTimeChange}
              label="Booking Time"
            >
              <MenuItem value="">
                <em>Select Time</em>
              </MenuItem>
              {availableTimes.map((time) => (
                <MenuItem key={time} value={time}>
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
