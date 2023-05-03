import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { useQuery } from "react-query";

const Myappointment = () => {
  const { user } = useContext(AuthContext);
  const url = `https://pharmacy-inventory.vercel.app/api/v1/pharmacy/booking?email=${user?.email}`;

  const { data: bookings = [] } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = res.json();
      return data;
    },
  });
  return (
    <div>
      <h3 className="tex-3xl mb-5">My Appointments</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Treatment</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings?.map((booking, i) => (
              <tr key={booking._id} className="hover">
                <th>{i + 1}</th>
                <td>{booking.patientName}</td>
                <td>{booking.treatment}</td>
                <td>{booking.bookingDate}</td>
                <td>{booking.slot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Myappointment;
