import React from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const HanleyMedicine = ({ medicine }) => {
  const { drugName, condition, availabilityHanley, idCheck, stock, _id } =
    medicine;

  const handleStock = () => {
    if (stock < 10) {
      toast.error("Stock less than 10!", {
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
          <span className="font-bold ">Id Check Required: </span>
          {idCheck}
        </p>
        <p>
          <span className="font-bold ">Stock: </span>
          {stock}
        </p>
        <p>
          <span className="font-bold ">Availability in Hanley store: </span>
          {availabilityHanley}
        </p>
        <div className="card-actions justify-end">
          <Link to={`/hanley-store/${_id}`}>
            {" "}
            <button onClick={() => handleStock()} className="btn btn-primary">
              Sell Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HanleyMedicine;