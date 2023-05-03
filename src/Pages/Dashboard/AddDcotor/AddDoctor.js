import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const imageHostingKey = process.env.REACT_APP_Imagebb_Key;
  const navigate = useNavigate();

  const { data: specialties = [], isLoading } = useQuery({
    queryKey: ["doctor-specialty"],
    queryFn: async () => {
      const res = await fetch(
        "https://pharmacy-inventory.vercel.app/api/v1/pharmacy/doctor-specialty"
      );
      const data = await res.json();
      return data;
    },
  });
  const handleAddDoctor = (data) => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        console.log(imageData);
        if (imageData.success) {
          console.log(imageData.data.url);
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            image: imageData.data.url,
          };
          //   post a doctor
          fetch(
            `https://pharmacy-inventory.vercel.app/api/v1/pharmacy/doctors`,
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(doctor),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              toast.success(`Doctor added successfully`);
              navigate("/dashboard/manage-doctors");
            });
        }
      });
  };
  return (
    <div className="w-96 p-7">
      <h2 className="text-4xl">Add a doctor</h2>
      <form onSubmit={handleSubmit(handleAddDoctor)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Name</span>
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-lg"
          />
          {errors.name && (
            <p className="text-red-600" role="alert">
              {errors.name?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Email</span>
          </label>
          <input
            {...register("email", { required: "Email Address is required" })}
            type="email"
            placeholder="Type here"
            className="input input-bordered w-full max-w-lg"
          />
          {errors.email && (
            <p className="text-red-600" role="alert">
              {errors.email?.message}
            </p>
          )}
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Specialty</span>
          </label>
          <select
            {...register("specialty", { required: "Speciality required" })}
            className="select input-bordered w-full max-w-xs"
          >
            {specialties.map((specialty) => (
              <option key={specialty._id} value={specialty.name}>
                {specialty.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text font-semibold">Photo</span>
          </label>
          <input
            {...register("img", { required: "Photo is required" })}
            type="file"
            className="input input-bordered w-full max-w-lg"
          />
          {errors.img && (
            <p className="text-red-600" role="alert">
              {errors.img?.message}
            </p>
          )}
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

export default AddDoctor;
