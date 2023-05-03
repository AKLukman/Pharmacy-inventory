import React from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Medi = ({ medicine }) => {
  const { drugName, condition, availabilityStoke, idCheck, stock, _id } =
    medicine;

  const handleUpdateQuantity = (event) => {
    fetch(
      `https://pharmacy-inventory.vercel.app/api/v1/pharmacy/allmedicine/${_id}`,
      {
        method: "PATCH",
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));

    if (stock < 10) {
      toast("Stock less than 10!", {
        style: {
          backgroundColor: "white",
          color: "red",
          fontSize: "bold",
        },
      });
    }
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title capitalize">{drugName}</h2>
        <p>
          <span className="font-bold ">Condition: </span>
          {condition}
        </p>
        <p>
          <span className="font-bold ">Availability in Stock: </span>
          {availabilityStoke}
        </p>
        <p>
          <span className="font-bold ">Id Check Required: </span>
          {idCheck}
        </p>
        <p>
          <span className="font-bold ">Stock: </span>
          {stock}
        </p>
        <div className="card-actions justify-end">
          <button
            onClick={() => handleUpdateQuantity()}
            className="btn btn-primary"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Medi;
