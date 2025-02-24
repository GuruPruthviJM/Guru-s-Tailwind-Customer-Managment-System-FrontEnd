import React from "react";

const services = [
  {
    title: "Data And AI",
    description:
      "AI powered solutions are transforming healthcare, improving diagnosis, patient care, and operational efficiency for a better future.",
    imgSrc: "/Data_and_AI.jpg",
    location: "Bangalore",
  },
  {
    title: "Product & Platform Engineering",
    description:
      "Building scalable and robust platforms to drive digital transformation and innovation.",
    imgSrc: "/PPE.jpg",
    location: "Hyderabad",
  },
  {
    title: "Digital Transformation",
    description:
      "Empowering businesses with cutting-edge digital solutions for the modern era.",
    imgSrc: "/Digital_Transformation_Consulting.jpg",
    location: "Chennai",
  },
  {
    title: "Consulting",
    description:
      "Expert strategic guidance to navigate complex business challenges and drive growth.",
    imgSrc: "/Design_and_content_Innovation.jpg",
    location: "Gurgaon",
  },
  {
    title: "Customer Service Transformation",
    description:
      "Enhancing customer experiences through innovative service solutions.",
    imgSrc: "/Customer_Experience_Transformation.jpg",
    location: "Pune",
  },
  {
    title: "Infrastructure Cloud and Security",
    description:
      "Explore additional offerings to boost your business capabilities.",
    imgSrc: "/Infrastructure_cloud_and_security.jpg",
    location: "Mysore",
  },
];

const Cards = () => {
  return (
    <div className="max-w-[1200px] mx-auto py-5 flex justify-center items-center min-h-screen">
      <div className="flex flex-wrap justify-center m-0">
        {services.map((service, index) => (
          <div
            key={index}
            className={`w-full md:w-1/3 flex justify-center ${
              index >= 3 ? "mt-[10px]" : ""
            }`}
          >
            <div className="w-full max-w-[280px] h-[320px] rounded-[12px] overflow-hidden shadow-[0_5px_12px_rgba(0,0,0,0.2)] bg-white flex flex-col justify-between transition-transform duration-200 ease-in-out hover:scale-105 m-2">
              <img
                src={service.imgSrc}
                alt={service.title}
                className="h-[150px] w-full object-cover"
              />
              <div className="flex-1 flex flex-col justify-start p-[10px] text-center">
                <h5 className="text-base mb-[5px] font-bold">
                  {service.title}
                </h5>
                <p className="text-[12px] text-[#555] leading-[1.4] mb-auto">
                  {service.description}
                </p>
                <p className="text-[12px] text-gray-600">
                  Location: {service.location || "N/A"}
                </p>
                <a
                  href="/customers/purchase"
                  className="bg-black border-0 uppercase font-bold w-full py-[8px] text-[12px] mt-2 block text-white"
                >
                  PAY HERE →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
