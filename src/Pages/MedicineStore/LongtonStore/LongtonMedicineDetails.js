import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const LongtonMedicineDetails = () => {
  const medicineId = useLoaderData();
  const [quantity, setQuantity] = useState(1);
  const [mama, setMama] = useState(false);

  const {
    data: medicine = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [`longton-store`],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/api/v1/pharmacy/longton-store/${medicineId._id}`
      );
      const data = await res.json();
      return data;
    },
  });
  const handleUpdateQuantity = (event) => {
    if (medicine.stock > 0) {
      fetch(
        `http://localhost:5000/api/v1/pharmacy/allmedicine/${medicineId._id}`,
        {
          method: "PATCH",
          headers: {
            quantity: quantity,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast.success("Sell successfully!");
          handlePrint();
          refetch();
          // Sales post
          const sale = {
            drugName: medicine.drugName,
            conditions: medicine.condition,
            date: new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            time: new Date().toLocaleDateString("en-US", {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: true,
            }),
          };
          fetch(`http://localhost:5000/api/v1/pharmacy/sales`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(sale),
          });
        });
    } else {
      toast.error("Stock Out");
    }

    if (medicine?.stock < 10) {
      toast("Stock less than 10!", {
        style: {
          backgroundColor: "white",
          color: "red",
          fontSize: "bold",
        },
      });
    }
  };

  // print

  const PrintComponent = ({ contentRef }) => {
    return (
      <div ref={contentRef}>
        <div class="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div class="border-t-2 border-b-2 py-4 mb-8">
            <h1 class="text-lg font-semibold text-center">
              PharmaZeal SALE INVOICE
            </h1>
            <p class="text-sm text-center mt-2">
              Stoke-on-Trent Staffordshire ST4 2DE
            </p>
          </div>
          <div class="border-b-2 py-4 mb-8">
            <h2 class="text-lg font-semibold">Customer Details:</h2>
            <div class="mt-4">
              <p class="text-sm font-medium">Name:</p>
              <p class="text-lg">
                {user?.firstName} {user?.surname}
              </p>
            </div>
            <div class="mt-4">
              <p class="text-sm font-medium">Address:</p>
              <p class="text-lg">123 Main St.</p>
              <p class="text-lg">Anytown, UK 12345</p>
            </div>
            <div class="mt-4">
              <p class="text-sm font-medium">Phone:</p>
              <p class="text-lg">(123) 456-7890</p>
            </div>
            <div class="mt-4">
              <p class="text-sm font-medium">Email:</p>
              <p class="text-lg"></p>
            </div>
          </div>
          <div class="border-b-2 py-4 mb-8">
            <h2 class="text-lg font-semibold">Medicine Details:</h2>
            <table class="w-full mt-4">
              <thead class="text-sm font-medium">
                <tr>
                  <th class="text-left">Medicine</th>
                  <th class="text-right">Price</th>
                  <th class="text-right">Quantity</th>
                  <th class="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-sm">{medicine.drugName}</td>
                  <td class="text-right">$19.99</td>
                  <td class="text-right">2</td>
                  <td class="text-right">$39.98</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="border-b-2 py-4 mb-8">
            <div class="flex justify-between">
              <p class="text-sm font-medium">Subtotal:</p>
              <p class="text-lg font-semibold">$179.94</p>
            </div>
            <div class="flex justify-between mt-2">
              <p class="text-sm font-medium">Tax:</p>
              <p class="text-lg font-semibold">$17.99</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const contentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });

  // Birth date check

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  const [userRegisterd, setUserRegisterd] = useState("");
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
  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/pharmacy/users/${dateOfBirth}`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [dateOfBirth]);

  const handleCheckId = (data) => {
    const date = Date.parse(user?.dob);
    const diff_ms = Date.now() - date;
    const age_dt = new Date(diff_ms);
    const age = Math.abs(age_dt.getUTCFullYear() - 1970);
    console.log(age);
    const inputDate = Date.parse(dateOfBirth);
    console.log(date, inputDate);
    if (date && user?.store === "longton" && age > 17) {
      console.log("success");
      setUserRegisterd("User valid for buy this medicine");
      toast.success("User is registered");
      setMama(true);
      setUnderAge("");
      setStore("");
      setNotMached("");
    } else if (date !== inputDate) {
      console.log("failed");
      toast.error("User not registered!.", {
        style: {
          backgroundColor: "white",
          color: "red",
          fontSize: "bold",
        },
      });
      setNotMached("User not registered!");
      setUnderAge("");
      setStore("");
      setUserRegisterd("");
      reset();
    } else if (date && user?.store === "longton" && age < 18) {
      toast.error("User under aged!.", {
        style: {
          backgroundColor: "white",
          color: "red",
          fontSize: "bold",
        },
      });
      setUnderAge("User under aged!");
      setNotMached("");
      setStore("");
      setUserRegisterd("");
      reset();
    } else if (date && user?.store !== "longton") {
      toast(`User register at ${user?.store}`, {
        style: {
          backgroundColor: "white",
          color: "red",
          fontSize: "bold",
        },
      });
      setStore(user?.store);
      setNotMached("");
      setUnderAge("");
      setUserRegisterd("");
      reset();
    }
  };

  // sale details

  let details = (
    <div>
      {" "}
      <h2 className="text-4xl m-10 text-center font-bold">Medicine Details</h2>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-4xl font-bold uppercase">{medicine.drugName}</h2>
      </div>
      <div class="flex flex-col sm:flex-row sm:items-center mb-4">
        <div class="flex items-center mb-2 sm:mb-0 sm:mr-4">
          <svg
            class="w-5 h-5 text-blue-500 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M17.293 6.707A8 8 0 113.707 20.293a8 8 0 0113.586-13.586zM4 10a6 6 0 1112 0 6 6 0 01-12 0z"
            ></path>
          </svg>
          <span class="text-gray-600">{medicine.condition}</span>
        </div>
        <div class="flex items-center">
          <svg
            class="w-5 h-5 text-blue-500 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3 2a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1H3zm8 3a3 3 0 100 6 3 3 0 000-6zm-6 7v2h12v-2H5z"
            ></path>
          </svg>
          <span class="text-gray-600">{medicine.stock} Stocks</span>
        </div>
      </div>
      <div className="mb-4">
        <p>
          ID Check Required:
          <span className="font-bold"> {medicine.idCheck}</span>
        </p>
        <p>
          Availability in Longton store:
          <span className="font-bold"> {medicine.availabilityLongton}</span>
        </p>
      </div>
      <div class="w-1/3">
        <label for="quantity" class="text-gray-600">
          Quantity:
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          class="w-full mb-6 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min="0"
          onChange={(e) => setQuantity(e.target.value)}
          defaultValue={1}
        />

        <button
          onClick={() => handleUpdateQuantity()}
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
        >
          Sell now
        </button>
      </div>
    </div>
  );

  return (
    <div className="m-[50px]">
      {medicine.idCheck === "N" && mama === true && <div>{details}</div>}

      {medicine.idCheck === "Y" && mama === false ? (
        <div>
          <h2 className="text-4xl m-10 text-center font-bold">ID CHECK</h2>
          <div class="flex justify-center mt-30 mb-24">
            <form onSubmit={handleSubmit(handleCheckId)}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text font-semibold">
                    Date of Birth
                  </span>
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
              {users.length ? (
                <select name="slot" className="input input-bordered w-[320px]">
                  {users.map((users) => (
                    <option key={users._id} value={users}>
                      {users.surname}
                    </option>
                  ))}
                </select>
              ) : (
                ""
              )}
              <br />

              {userRegisterd && (
                <p className="text-green-600 font-bold">{userRegisterd}</p>
              )}
              {notMatched && (
                <p className="text-red-600 font-bold">{notMatched}</p>
              )}
              {underAge && <p className="text-red-600 font-bold">{underAge}</p>}
              {store && (
                <p className="text-green-600">
                  User registered at{" "}
                  <span className="text-red-600 font-bold">{store} store</span>
                </p>
              )}
              <input
                className="btn btn-accent w-[320px] mt-2"
                value="Check"
                type="submit"
              />
              <div>
                {/* {loginError && <p className="text-red-600">{loginError}</p>} */}
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>{details}</div>
      )}

      {/* print */}
      <div>
        <div style={{ display: "none" }}>
          <PrintComponent contentRef={contentRef} />
        </div>

        {/* <button onClick={handlePrint}>Print</button> */}
      </div>
    </div>
  );
};

export default LongtonMedicineDetails;
