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
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/appointments", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    
      }
    }
  }

  const handleEventClick = (clickInfo) => {
    setEventDetails(clickInfo.event);
  };

  const handleClose = () => {
    setEventDetails(null);
  };

  const events = [
    {
      id: "1",
      title: "Doctor Appointment",
      start: new Date().toISOString().substring(0, 10) + "T10:00:00",
      end: new Date().toISOString().substring(0, 10) + "T11:00:00",
      allDay: false,
    },
    {
      id: "2",
      title: "Meeting",
      start: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .substring(0, 10),
      allDay: true,
    },
    {
      id: "3",
      title: "Lunch",
      start: new Date(new Date().getTime() + 48 * 60 * 60 * 1000)
        .toISOString()
        .substring(0, 10),
      allDay: true,
    },
  ];

  return (
    <Container maxWidth="md" style={{ padding: "10px" }}>
      <div>
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
              Start: {eventDetails.start.toISOString()}
              <br />
              End:{" "}
              {eventDetails.end
                ? eventDetails.end.toISOString()
                : "No end time"}
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
