import React from "react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { AuthContext } from "../../../context/AuthProvider";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["doctors-portal-users"],
    queryFn: async () => {
      const res = await fetch(
        "https://pharmacy-inventory.vercel.app/api/v1/pharmacy/doctors-portal-users"
      );
      const data = res.json();
      return data;
    },
  });
  const { user } = useContext(AuthContext);
  console.log(user.email);
  const hanndleMakeAdmin = (id) => {
    fetch(
      `https://pharmacy-inventory.vercel.app/api/v1/pharmacy/doctors-portal-users/admin/${id}`,
      {
        method: "PATCH",
        headers: {
          email: user?.email,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Make Admin Successfully");
          refetch();
        }
      });
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user?.role !== "admin" && (
                    <button
                      onClick={() => hanndleMakeAdmin(user._id)}
                      className="btn btn-primary"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  <button className="btn btn-error">delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
