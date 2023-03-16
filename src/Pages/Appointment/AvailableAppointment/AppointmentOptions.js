import React from "react";

const AppointmentOptions = ({ appointmentoptions, setTreatment }) => {
  const { name, slots } = appointmentoptions;
  return (
    <div className="card  shadow-xl">
      <div className="card-body text-center">
        <h2 className="text-2xl text-center text-secondary font-bold">
          {name}
        </h2>
        <p>{slots.length > 0 ? slots[0] : "Try another day"}</p>
        <p>
          {slots.length} {slots.length > 1 ? "spaces" : "space"} available
        </p>
        <div className="card-actions justify-center">
          <label
            disabled={slots.length === 0}
            onClick={() => setTreatment(appointmentoptions)}
            htmlFor="booking-modal"
            className="btn btn-primary text-white"
          >
            Book Appointment
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppointmentOptions;
