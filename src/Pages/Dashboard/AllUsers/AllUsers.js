import React, { useState } from "react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { AuthContext } from "../../../context/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["doctors-portal-users"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:5000/api/v1/pharmacy/doctors-portal-users"
      );
      const data = res.json();
      return data;
    },
  });

  const { user } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const [isAdmin] = useAdmin(user?.email);

  const hanndleMakeAdmin = (id) => {
    if (role) {
      console.log(id, user.email);
      fetch(
        `http://localhost:5000/api/v1/pharmacy/doctors-portal-users/admin/${id}`,
        {
          method: "PUT",
          headers: {
            email: user?.email,
            role: role,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.modifiedCount > 0) {
            toast.success(`Made ${role} Successfully`);
            refetch();
          }
        });
    }
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
              <th>Role</th>
              {isAdmin && (
                <>
                  <th>Set Role</th>
                  <th>Delete</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                {isAdmin && (
                  <>
                    <td>
                      <div className="flex">
                        <div class="w-2/3 max-w-md mx-auto my-4">
                          <select
                            id="options-field"
                            name="options-field"
                            class="block w-full py-2 px-3 border border-green-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            onBlur={(e) => setRole(e.target.value)}
                          >
                            <option value="" disabled selected>
                              Select users role
                            </option>
                            <option value="admin">Admin</option>
                            <option value="stuff">Stuff</option>
                          </select>
                        </div>
                        <div className="flex justify-center items-center">
                          <button
                            onClick={() => hanndleMakeAdmin(user._id)}
                            className="btn btn-sm"
                          >
                            submit
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <button className="btn btn-error">delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
