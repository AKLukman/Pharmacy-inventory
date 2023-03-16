import React from "react";
import fluoride from "../../../assets/images/fluoride.png";
import cavity from "../../../assets/images/cavity.png";
import whitening from "../../../assets/images/whitening.png";
import Service from "./Service";

const Services = () => {
  const servicesData = [
    {
      id: 1,
      nmae: "Flueoride Treatment",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
      img: fluoride,
    },
    {
      id: 2,
      nmae: "Cavity Filling",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
      img: cavity,
    },
    {
      id: 3,
      nmae: "Teeth Whitening",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the",
      img: whitening,
    },
  ];
  return (
    <div className="mt-16">
      <div className="text-center">
        <h3 className="text-xl text-primary font-bold uppercase">
          Our Services
        </h3>
        <h2 className="text-3xl font-bold">Services we provide</h2>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {servicesData.map((service) => (
          <Service key={service.id} service={service}></Service>
        ))}
      </div>
    </div>
  );
};

export default Services;
