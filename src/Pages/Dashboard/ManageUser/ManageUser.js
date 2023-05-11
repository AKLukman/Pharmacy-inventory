import React from "react";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading/Loading";
import { useState } from "react";
import ConfiramationModal from "../../Shared/ConfiramationModal/ConfiramationModal";
import { toast } from "react-hot-toast";

const ManageUser = () => {
  const [deletingUser, setDeletingUser] = useState(null);

  const closeModal = () => {
    setDeletingUser(null);
  };

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pharmacy-user"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5000/api/v1/pharmacy/pharmacy-user"
      );
      const data = res.json();
      return data;
    },
  });

  const handleDeleUser = (user) => {
    console.log(user);
    fetch(`http://localhost:5000/api/v1/pharmacy/pharmacy-user/${user._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("User deleted successfully!");

        if (data.deletedCount > 0) {
          refetch();
          toast.success(`${user.firstName} deleted successfully`);
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
              <th>Store</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, i) => (
              <tr>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">
                        {user.firstName} {user.surname}
                      </div>
                      {/* <div className="text-sm opacity-50">United States</div> */}
                    </div>
                  </div>
                </td>

                <td>
                  <span className="">{user.store}</span>
                </td>

                <th>
                  <label
                    onClick={() => setDeletingUser(user)}
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
      {deletingUser && (
        <ConfiramationModal
          title={`Are you sure want to delete?`}
          message={`If you delete ${deletingUser.surname}. It can not be undone!`}
          closeModal={closeModal}
          successAction={handleDeleUser}
          actionName="Delete"
          modalData={deletingUser}
        ></ConfiramationModal>
      )}
    </div>
  );
};

export default ManageUser;
