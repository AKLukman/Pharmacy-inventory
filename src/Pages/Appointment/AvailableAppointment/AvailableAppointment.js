import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import AppointmentOptions from "./AppointmentOptions";

const AvailableAppointment = ({ selectedDate, setSelectedDate }) => {
  const [appoimentOptions, setAppointmentOptions] = useState([]);
  const [treatment, setTreatment] = useState(null);

  useEffect(() => {
    fetch("AppointmentOptions.json")
      .then((res) => res.json())
      .then((data) => setAppointmentOptions(data));
  }, []);
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
        ></AppointmentModal>
      )}
    </section>
  );
};

export default AvailableAppointment;
