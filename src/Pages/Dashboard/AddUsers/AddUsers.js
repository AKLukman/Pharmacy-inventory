import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const AddUsers = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const stores = ["stoke", "hanley", "fenton", "tunstall", "longton"];

  const navigate = useNavigate();

  const handleAddUser = (data) => {
    const user = {
      dob: data.dob,
      firstName: data.firstName,
      surname: data.surname,
      city: data.city,
      store: data.store,
    };
    //   post a user
    fetch(`http://localhost:5000/api/v1/pharmacy//pharmacy-user`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success(`Pharmacy user added successfully`);
        navigate("/dashboard/manage-user");
      });
  };

  return (
    <div className="w-96 p-7">
      <h2 className="text-4xl">Add a User</h2>
      <form onSubmit={handleSubmit(handleAddUser)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Date of Birth</span>
          </label>
          <input
            {...register("dob", { required: "Name is required" })}
            type="date"
            placeholder="Type here"
            className="input input-bordered w-full max-w-lg"
          />
          {errors.dob && (
            <p className="text-red-600" role="alert">
              {errors.dob?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">First Name</span>
          </label>
          <input
            {...register("firstName", { required: "Name is required" })}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-lg"
          />
          {errors.firstName && (
            <p className="text-red-600" role="alert">
              {errors.firstName?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Surname</span>
          </label>
          <input
            {...register("surname", { required: "Name is required" })}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-lg"
          />
          {errors.surname && (
            <p className="text-red-600" role="alert">
              {errors.surname?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">City</span>
          </label>
          <input
            {...register("city", { required: "Email Address is required" })}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-lg"
          />
          {errors.city && (
            <p className="text-red-600" role="alert">
              {errors.city?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Store</span>
          </label>
          <select
            {...register("store", { required: "Speciality required" })}
            className="select input-bordered w-full max-w-xs"
          >
            {stores.map((store) => (
              <option key={store} value={store}>
                {store}
              </option>
            ))}
          </select>
        </div>

        <input
          className="btn btn-accent w-full mt-6"
          value="Sign Up"
          type="submit"
        />
      </form>
    </div>
  );
};

export default AddUsers;
