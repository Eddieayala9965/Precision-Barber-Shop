import { useQuery } from "@tanstack/react-query";
import BookingForm from "./BookingForm";
import dayjs from "dayjs";

export const BarberBookings = ({ barberId, selectedDate }) => {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ["barber_bookings", barberId, selectedDate],
    queryFn: async () => {
      const response = await fetch("http://127.0.0.1:8000/barber_bookings");
      const data = await response.json();
      return data;
    },
    enabled: !!barberId && !!selectedDate,
  });

  if (isLoading) return <div>Loading...</div>;

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.barber_id === barberId &&
      dayjs(booking.booking_date).isSame(selectedDate, "day")
  );

  return <BookingForm barberBookings={filteredBookings} />;
};
