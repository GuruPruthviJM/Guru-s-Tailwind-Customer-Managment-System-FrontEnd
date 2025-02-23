import React from "react";

const sections = [
  {
    title: "Our Vision",
    text: "To create a better world through innovation, collaboration, and sustainability.",
  },
  {
    title: "Our Mission",
    text: "Deliver excellence and value to our clients with integrity and transparency.",
  },
  {
    title: "Our Values",
    text: "Innovation, trust, and a commitment to customer success.",
  },
];

const AboutUs = () => {
  return (
    <div className="container mx-auto my-10 px-4">
      {/* About Section */}
      <div className="flex flex-col md:flex-row justify-between items-center flex-wrap gap-8">
        {/* Text Content */}
        <div className="w-full md:w-1/2 p-5 md:ml-10">
          <h3 className="text-5xl mb-2 underline">About Us</h3>
          <h5 className="mt-4 text-2xl">Who We Are</h5>
          <p className="mt-4 text-lg leading-relaxed">
            We are a passionate team dedicated to providing innovative solutions for our
            clients. With years of experience and expertise in various industries, we strive to
            deliver exceptional results that exceed expectations.
          </p>
          <p className="mt-4 text-lg leading-relaxed">
            Our mission is to empower businesses by leveraging cutting-edge technologies and
            fostering meaningful relationships.
          </p>
        </div>
        {/* Image */}
        <div className="w-full md:w-2/5 flex justify-center md:justify-start items-center">
          <img
            src="https://th.bing.com/th/id/OIP.9Zos_lyHe6HIw0FMMp8RHAHaFj?w=234&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"
            alt="Team Photo"
            className="w-[90%] max-h-[400px] rounded shadow-lg transition transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row gap-8 mt-12 md:justify-between">
        {sections.map((section, index) => (
          <div
            key={index}
            className="w-full md:w-1/3 bg-white p-6 rounded shadow-lg text-center transition transform duration-300 hover:scale-105"
          >
            <h5 className="text-lg mb-2 font-bold">{section.title}</h5>
            <p className="text-base text-gray-700">{section.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
