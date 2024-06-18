import { useState, useEffect } from "react";
import axios from "axios";

// Square API Configurations
const SQUARE_API_URL = "https://connect.squareup.com/v2";
const ACCESS_TOKEN =
  "EAAAl2AszgqTsyY9e1n5_9_T8V7CK-4n34QxHwGJt4m28q7PBcXHgk-bw3gmgVov";

const BookingService = () => {
  const [services, setServices] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedBarber, setSelectedBarber] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  useEffect(() => {
    fetchServices();
    fetchBarbers();
  }, []);

  useEffect(() => {
    if (selectedBarber) {
      fetchAvailability(selectedBarber);
    }
  }, [selectedBarber]);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${SQUARE_API_URL}/catalog/list`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const items = response.data.objects;
      const services = items.filter((item) => item.type === "ITEM");
      setServices(services);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const fetchBarbers = async () => {
    try {
      const response = await axios.get(`${SQUARE_API_URL}/team-members`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const teamMembers = response.data.team_members;
      setBarbers(teamMembers);
    } catch (error) {
      console.error("Error fetching barbers:", error);
    }
  };

  const fetchAvailability = async (barberId) => {
    try {
      const response = await axios.get(
        `${SQUARE_API_URL}/labor/shifts/search`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          data: {
            query: {
              filter: {
                employee_id: barberId,
              },
            },
          },
        }
      );
      const shifts = response.data.shifts;
      setAvailability(shifts);
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleBarberChange = (e) => {
    setSelectedBarber(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission logic here
    console.log("Booking Submitted:", {
      service: selectedService,
      barber: selectedBarber,
      time: selectedTime,
    });
  };

  return (
    <div>
      <h1>Book a Service</h1>
      <form onSubmit={handleBookingSubmit}>
        <div>
          <label>Service:</label>
          <select value={selectedService} onChange={handleServiceChange}>
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.item_data.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Barber:</label>
          <select value={selectedBarber} onChange={handleBarberChange}>
            <option value="" disabled>
              Select a barber
            </option>
            {barbers.map((barber) => (
              <option key={barber.id} value={barber.id}>
                {barber.given_name} {barber.family_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Available Times:</label>
          <select value={selectedTime} onChange={handleTimeChange}>
            <option value="" disabled>
              Select a time
            </option>
            {availability.map((shift) => (
              <option key={shift.id} value={shift.start_at}>
                {new Date(shift.start_at).toLocaleString()}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingService;
