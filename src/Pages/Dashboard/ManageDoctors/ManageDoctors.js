import React from "react";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";
import { useState } from "react";
import ConfiramationModal from "../../Shared/ConfiramationModal/ConfiramationModal";
import { toast } from "react-hot-toast";
import { daysInWeek } from "date-fns/constants";

const ManageDoctors = () => {
  const [deletingDoctor, setDeletingDoctor] = useState(null);

  const closeModal = () => {
    setDeletingDoctor(null);
  };

  const {
    data: doctors = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/pharmacy/doctors");
      const data = res.json();
      return data;
    },
  });

  const handleDeleteDoctor = (doctor) => {
    console.log(doctor);
    fetch(`http://localhost:5000/api/v1/pharmacy/doctors/${doctor._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // toast.success("Doctor deleted successfully!");

        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Doctor ${doctor.name} deleted successfully`);
        }
      });
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {doctors.map((doctor, i) => (
              <tr>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={doctor?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{doctor.name}</div>
                      {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                  </div>
                </td>
                <td>
                  <span className="">{doctor.email}</span>
                </td>
                <td>
                  <span className="badge badge-ghost badge-lg">
                    {doctor.specialty}
                  </span>
                </td>
                <th>
                  <label
                    onClick={() => setDeletingDoctor(doctor)}
                    htmlFor="confirmation-modal"
                    className="btn btn-ghost btn-xs"
                  >
                    delete
                  </label>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingDoctor && (
        <ConfiramationModal
          title={`Are you sure want to delete?`}
          message={`If you delete ${deletingDoctor.name}. It can not be undone!`}
          closeModal={closeModal}
          successAction={handleDeleteDoctor}
          actionName="Delete"
          modalData={deletingDoctor}
        ></ConfiramationModal>
      )}
    </div>
  );
};

export default ManageDoctors;
