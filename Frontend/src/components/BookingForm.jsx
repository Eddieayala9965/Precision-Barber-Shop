import React, { useState, useEffect } from "react";
import { supabase } from "../utils/Supabase";

function BookingForm() {
  const [formData, setFormData] = useState({
    barber_id: "",
    service_id: "",
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    booking_date: "",
  });

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
      // Filter services based on selected barber
      const filteredServices = barberServices.filter(
        (bs) => bs.barber_id === value
      );
      setServices(filteredServices);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.rpc("insert_booking_appointment", {
      barber_id: formData.barber_id,
      service_id: formData.service_id,
      customer_name: formData.customer_name,
      customer_phone: formData.customer_phone,
      customer_email: formData.customer_email,
      booking_date: formData.booking_date,
    });

    if (error) {
      console.error("Error creating booking:", error);
    } else {
      console.log("Booking created successfully:", data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="barber_id"
        value={formData.barber_id}
        onChange={handleChange}
      >
        <option value="">Select Barber</option>
        {barbers.map((barber) => (
          <option key={barber.barber_id} value={barber.barber_id}>
            {barber.barber_name}
          </option>
        ))}
      </select>
      <select
        name="service_id"
        value={formData.service_id}
        onChange={handleChange}
      >
        <option value="">Select Service</option>
        {services.map((service) => (
          <option key={service.service_id} value={service.service_id}>
            {service.service_name}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="customer_name"
        placeholder="Customer Name"
        value={formData.customer_name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="customer_phone"
        placeholder="Customer Phone"
        value={formData.customer_phone}
        onChange={handleChange}
      />
      <input
        type="datetime-local"
        name="booking_date"
        placeholder="Booking Date"
        value={formData.booking_date}
        onChange={handleChange}
      />
      <input
        type="text"
        name="customer_email"
        placeholder="Customer Email"
        value={formData.customer_email}
        onChange={handleChange}
      />
      <button type="submit">Create Booking</button>
    </form>
  );
}

export default BookingForm;
