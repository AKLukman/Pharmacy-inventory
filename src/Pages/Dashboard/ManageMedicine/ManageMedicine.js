import React from "react";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";
import { useState } from "react";
import ConfiramationModal from "../../Shared/ConfiramationModal/ConfiramationModal";
import { toast } from "react-hot-toast";

const ManageMedicine = () => {
  const [deletingMedicine, setDeletingMedicine] = useState(null);

  const closeModal = () => {
    setDeletingMedicine(null);
  };

  const {
    data: allmedicine = [],
    isLoading,

    refetch,
  } = useQuery({
    queryKey: ["pharmacy-medicine"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5000/api/v1/pharmacy/pharmacy-medicine"
      );
      const data = res.json();
      return data;
    },
  });
  console.log(allmedicine);

  const handleDeleMedicine = (medicine) => {
    fetch(
      `http://localhost:5000/api/v1/pharmacy/pharmacy-medicine/${medicine._id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`${medicine.drugName} deleted successfully`);
        }
      });
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h3 className="text-xl mb-5 font-bold uppercase">Manage Medicine</h3>
      <p className="mb-1">
        <span className="text-white font-bold bg-cyan-500 p-0.5">
          Total Stock: {allmedicine.length}
        </span>
      </p>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>update</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allmedicine.map((medicine, i) => (
              <tr>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{medicine.drugName}</div>
                      {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                  </div>
                </td>
                <td>
                  <span className="">{medicine.stock}</span>
                </td>

                <td>
                  <span className="">£{medicine.price}</span>
                </td>
                <th>
                  <label
                    htmlFor="confirmation-modal"
                    className="btn btn-ghost btn-xs"
                  >
                    update
                  </label>
                </th>

                <th>
                  <label
                    onClick={() => setDeletingMedicine(medicine)}
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
      {deletingMedicine && (
        <ConfiramationModal
          title={`Are you sure want to delete?`}
          message={`If you delete ${deletingMedicine.drugName}. It can not be undone!`}
          closeModal={closeModal}
          successAction={handleDeleMedicine}
          actionName="Delete"
          modalData={deletingMedicine}
        ></ConfiramationModal>
      )}
    </div>
  );
};

export default ManageMedicine;
