import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const Appointments = () => {
  return (
    <div style={{ padding: "10px", maxWidth: "1000px" }} className="mx-auto">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        contentHeight="100%"
        aspectRatio={1.5}
        events={[{ title: "Appointment", date: "2023-10-22" }]}
      />
    </div>
  );
};

export default Appointments;
