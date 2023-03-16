import React from "react";

const InfoCard = ({ card }) => {
  const { name, desc, icon, bgClass } = card;
  return (
    <div className={`card p-6 text-white md:card-side  shadow-xl ${bgClass}`}>
      <figure>
        <img src={icon} alt="Movie" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{desc}</p>
        {/* <div className="card-actions justify-end">
          <button className="btn btn-primary">Watch</button>
        </div> */}
      </div>
    </div>
  );
};

export default InfoCard;
