import { format } from "date-fns";
import React from "react";

const AvailableAppointment = ({ selectedDate, setSelectedDate }) => {
  return (
    <section className="mt-16">
      <p className="text-center text-primary font-bold uppercase">
        Available Appointment {format(selectedDate, "PP")}.
      </p>
    </section>
  );
};

export default AvailableAppointment;
