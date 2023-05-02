import React from "react";
import chair from "../../../assets/images/chair.png";

const Banner = () => {
  return (
    <div>
      <div className="hero bg-[url('/src/assets/images/appointment.png')] bg-gradient-to-br">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src={chair}
            className=" rounded-lg shadow-2xl lg:w-1/2"
            alt="Chair"
          />
          <div>
            <h1 className="text-5xl font-bold">PharmaZeal</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
