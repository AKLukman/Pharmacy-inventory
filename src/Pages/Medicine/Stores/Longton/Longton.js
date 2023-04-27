import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Longton = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [users, setUser] = useState({});
  const [notMatched, setNotMached] = useState("");
  const [underAge, setUnderAge] = useState("");
  const [dateOfBirth, setDob] = useState("");
  const [store, setStore] = useState("");
  console.log("input date: ", dateOfBirth);
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/pharmacy/user/${dateOfBirth}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [dateOfBirth]);

  const navigate = useNavigate();

  const handleCheckId = (data) => {
    const date = Date.parse(users?.dob);
    const diff_ms = Date.now() - date;
    const age_dt = new Date(diff_ms);
    const age = Math.abs(age_dt.getUTCFullYear() - 1970);
    console.log(age);
    const inputDate = Date.parse(dateOfBirth);
    console.log(date, inputDate);
    if (date && users?.store === "Longton" && age > 17) {
      console.log("success");
      navigate("/allmedicine");
    } else if (date !== inputDate) {
      console.log("failed");

      toast("User not registered!.", {
        style: {
          backgroundColor: "white",
          color: "red",
          fontSize: "bold",
        },
      });

      setNotMached("User not registered!");
      setUnderAge("");
      setStore("");
      reset();
    } else if (date && users?.store === "Longton" && age < 18) {
      toast("User under aged!.", {
        style: {
          backgroundColor: "white",
          color: "red",
          fontSize: "bold",
        },
      });
      setUnderAge("User under aged!");
      setNotMached("");
      setStore("");
      reset();
    } else if (date && users?.store !== "Longton") {
      toast(`User register at ${users?.store}`, {
        style: {
          backgroundColor: "white",
          color: "red",
          fontSize: "bold",
        },
      });
      setStore(users?.store);
      setNotMached("");
      setUnderAge("");
      reset();
    }
  };
  return (
    <div className="h-[500px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-xl text-center  font-bold">Longton Store</h2>
        <form onSubmit={handleSubmit(handleCheckId)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-semibold">Date of Birth</span>
            </label>
            <input
              {...register("birthDate", {
                required: "Birth of date is required",
              })}
              type="date"
              className="input input-bordered w-full max-w-lg"
              onChange={(e) => setDob(e.target.value)}
            />
            {errors.birthDate && (
              <p className="text-red-600" role="alert">
                {errors.birthDate?.message}
              </p>
            )}
          </div>

          {notMatched && <p className="text-red-600 font-bold">{notMatched}</p>}
          {underAge && <p className="text-red-600 font-bold">{underAge}</p>}
          {store && (
            <p className="text-green-600">
              User registered at{" "}
              <span className="text-red-600 font-bold">{store} store</span>
            </p>
          )}
          <input
            className="btn btn-accent w-full mt-4"
            value="Registered"
            type="submit"
          />
          <div>
            {/* {loginError && <p className="text-red-600">{loginError}</p>} */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Longton;
