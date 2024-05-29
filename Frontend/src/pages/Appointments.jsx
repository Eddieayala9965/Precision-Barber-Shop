import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import multiMonthPlugin from "@fullcalendar/multimonth";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

const Appointments = () => {
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [events, setEvents] = useState([]);

  // when doing the view vs the actual table we need to set row level secuirty on the tables to give the user access to thier own data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/appointments_details",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify(),
          }
        );
        const data = await response.json();
        console.log("lets see if we are getting anything back", data);
        const formattedEvents = data.map((appointment) => ({
          title: "Appointment",
          haircut: appointment.service_name,
          start: appointment.appointment_date,
          name: appointment.client_name,
          phone: appointment.client_phone,
          email: appointment.client_email,
        }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleEventClick = (clickInfo) => {
    setEventDetails({
      ...clickInfo.event.extendedProps,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
    });
  };

  const handleClose = () => {
    setEventDetails(null);
  };

  const [eventDetails, setEventDetails] = useState(null);

  return (
    <Container maxWidth="md" style={{ padding: "10px" }}>
      <div className="flex gap-5">
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentView("dayGridMonth")}
        >
          Month View
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentView("timeGridWeek")}
        >
          Week View
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCurrentView("listWeek")}
        >
          List View
        </Button>
      </div>
      <FullCalendar
        key={currentView}
        plugins={[dayGridPlugin, multiMonthPlugin, timeGridPlugin, listPlugin]}
        initialView={currentView}
        height="auto"
        contentHeight="100%"
        aspectRatio={1.5}
        events={events}
        eventClick={handleEventClick}
      />
      {eventDetails && (
        <Dialog open={true} onClose={handleClose}>
          <DialogTitle>Event Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Title: {eventDetails.title}
              <br />
              Start:{" "}
              {eventDetails.start.toLocaleString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
              <br />
              Name: {eventDetails.name}
              <br />
              Phone: {eventDetails.phone}
              <br />
              Email: {eventDetails.email}
              <br />
              Haircut: {eventDetails.haircut}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default Appointments;
