import React from 'react';
import { useNavigate } from 'react-router-dom';
import OutageMap from '../../../components/OutageMap';

const AdminHome = () => {
  const navigate = useNavigate();

  const indianTicketsData = [
    { lat: 19.0760, lng: 72.8777, ticketsCount: 3, popupText: "Mumbai: 3 tickets" },
    { lat: 28.7041, lng: 77.1025, ticketsCount: 6, popupText: "Delhi: 6 tickets" },
    { lat: 12.9716, lng: 77.5946, ticketsCount: 4, popupText: "Bangalore: 4 tickets" },
    { lat: 13.0827, lng: 80.2707, ticketsCount: 7, popupText: "Chennai: 7 tickets" },
  ];

  const buttons = [
    {
      label: "Add Employee",
      path: "/admins/add",
      color: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    },
    {
      label: "Update Employee",
      path: "/admins/update",
      color: "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700",
    },
    {
      label: "Read Employee",
      path: "/admins/read",
      color: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    },
    {
      label: "Delete Employee",
      path: "/admins/delete",
      color: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col px-4">
      <h1 className="text-4xl font-extrabold mb-10 bg-clip-text my-8 mx-32">
        Employee Management
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-32">
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => navigate(btn.path)}
            className={`py-4 px-8 rounded-lg w-[90%] text-white font-bold transition transform duration-300 hover:scale-105 shadow-lg bg-gradient-to-r ${btn.color}`}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div>
        <h1>Indian Outage Map</h1>
            <OutageMap ticketsData={indianTicketsData} mapCenter={[22.5937, 78.9629]} zoom={5} />
      </div>
    </div>
  );
};

export default AdminHome;
