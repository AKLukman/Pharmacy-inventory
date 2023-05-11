import React from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const TunstallMedicine = ({ medicine }) => {
  const {
    drugName,
    condition,
    availabilityTunstall,
    idCheck,
    stock,
    price,
    _id,
  } = medicine;

  const handleStock = () => {
    if (stock < 10) {
      toast.error(`Stock less than 10!`, {
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
          <span className="font-bold ">Price: </span>£{price}
        </p>
        <p>
          <span className="font-bold ">Availability in Tunstall store: </span>
          {availabilityTunstall}
        </p>
        <div className="card-actions justify-end">
          <Link to={`/tunstall-store/${_id}`}>
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

export default TunstallMedicine;
