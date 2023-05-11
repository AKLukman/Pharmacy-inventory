import { format } from "date-fns";
import React, { useState } from "react";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import AppointmentOptions from "./AppointmentOptions";
import { useQuery } from "react-query";

const AvailableAppointment = ({ selectedDate, setSelectedDate }) => {
  // const [appoimentOptions, setAppointmentOptions] = useState([]);
  const [treatment, setTreatment] = useState(null);
  const date = format(selectedDate, "PP");

  const { data: appoimentOptions = [], refetch } = useQuery({
    queryKey: ["appointmentOptions", date],
    queryFn: () =>
      fetch(
        `http://localhost:5000/api/v1/pharmacy/appointmentOptions?date=${date}`
      ).then((res) => res.json()),
  });

  return (
    <section className="mt-16">
      <p className="text-center text-primary font-bold uppercase">
        Available Appointment {format(selectedDate, "PP")}.
      </p>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {appoimentOptions.map((option) => (
          <AppointmentOptions
            key={option._id}
            appointmentoptions={option}
            setTreatment={setTreatment}
          ></AppointmentOptions>
        ))}
      </div>
      {treatment && (
        <AppointmentModal
          treatment={treatment}
          setTreatment={setTreatment}
          selectedDate={selectedDate}
          refetch={refetch}
        ></AppointmentModal>
      )}
    </section>
  );
};

export default AvailableAppointment;
