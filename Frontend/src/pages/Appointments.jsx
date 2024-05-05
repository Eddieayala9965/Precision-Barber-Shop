import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Appointments = () => {
  return (
    <div style={{ padding: "10px", maxWidth: "1000px", margin: "auto" }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto" // Adjusts height to the number of weeks in the month
        contentHeight="auto" // Makes the calendar stretch vertically
        aspectRatio={1.5} // Controls the width-to-height ratio
        events={[
          { title: "Appointment", date: "2023-10-22" },
          // Add more events here
        ]}
      />
    </div>
  );
};

export default Appointments;
