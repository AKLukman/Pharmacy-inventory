import React from "react";
import treatment from "../../../assets/images/treatment.png";

const Exception = () => {
  return (
    <div className="lg:mx-10 mt-8">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src={treatment} alt="Movie" />
        </figure>
        <div className="card-body lg:ml-8">
          <h2 className="card-title md:text-4xl lg:text-4xl font-bold">
            Exceptional Dental <br></br> Care, on Your Terms
          </h2>
          <p className="">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsumis that it has a more-or-less normal
            distribution of letters,as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary text-white uppercase">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exception;
