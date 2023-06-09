import { format } from "date-fns";
import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { toast } from "react-hot-toast";

const AppointmentModal = ({
  treatment,
  selectedDate,
  setTreatment,
  refetch,
}) => {
  // treament means appointmentOptions
  const { name, slots } = treatment;
  const date = format(selectedDate, "PP");
  const { user } = useContext(AuthContext);

  const handleBooking = (event) => {
    event.preventDefault();
    const form = event.target;
    const patientName = form.name.value;
    const slot = form.slot.value;
    const email = form.email.value;
    const phoneNumber = form.phoneNumber.value;

    const booking = {
      bookingDate: date,
      treatment: name,
      patientName,
      email,
      slot,
      phoneNumber,
    };
    //Todo: send data to the server
    // and once data is sved then close the modal
    // and display success toast

    fetch("http://localhost:5000/api/v1/pharmacy/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setTreatment(null);
          toast.success("Booking confirmed!");
          refetch();
        } else {
          toast.error(data.message);
        }
      });

    console.log(booking);
  };
  return (
    <>
      <input type="checkbox" id="booking-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="booking-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{name}</h3>
          <form
            onSubmit={handleBooking}
            className="grid grid-cols-1 gap-3 mt-6"
          >
            {" "}
            <input
              type="text"
              value={date}
              className="input w-full input-bordered"
              disabled
            />
            <select name="slot" className="select select-bordered w-full">
              {slots.map((slot, index) => (
                <option key={index} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="input w-full input-bordered"
              defaultValue={user?.displayName}
              disabled
            />
            <input
              type="email"
              placeholder="Email Address"
              className="input w-full input-bordered"
              name="email"
              defaultValue={user?.email}
              disabled
            />
            <input
              type="text"
              placeholder="Phone number"
              className="input w-full input-bordered"
              name="phoneNumber"
            />
            <br />
            <input
              className="w-full max-w-xm btn btn-primary text-white input-bordered"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default AppointmentModal;
