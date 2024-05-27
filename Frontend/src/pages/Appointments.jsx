import React, { useState } from "react";
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

  const handleEventClick = (clickInfo) => {
    setEventDetails(clickInfo.event);
  };

  const handleClose = () => {
    setEventDetails(null);
  };

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
        events={[{ title: "Appointment", date: "2024-5-27", time: "10:00" }]}
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
