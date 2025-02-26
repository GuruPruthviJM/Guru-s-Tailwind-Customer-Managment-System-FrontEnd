import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OutageMap from "../../../components/OutageMap";
import MyBarChart from "../../../components/barGraph";
import { fetchTicketsCount } from "../../../Redux/admin_model/outage/outageActions";
import { fetchChartData } from "../../../Redux/admin_model/DomainCountTicket/chartActions"; // Separate API for chart data

const AdminHome = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get tickets count state from Redux store (from outage slice)
  const { ticketsCount, loading: ticketsLoading, error: ticketsError } = useSelector(
    (state) => state.outage
  );

  // Get chart data state from Redux store (from chart slice)
  const { chartData, loading: chartLoading, error: chartError } = useSelector(
    (state) => state.chart
  );

  // Fetch tickets count when component mounts
  useEffect(() => {
    dispatch(fetchTicketsCount());
  }, [dispatch]);

  // Fetch chart data when component mounts
  useEffect(() => {
    dispatch(fetchChartData());
  }, [dispatch]);

  // Transform ticketsCount data from { "lat_lng": count } to an array of objects:
  // [{ lat: <number>, lng: <number>, ticketsCount: <number> }, ...]
  const transformedTicketsData = useMemo(() => {
    if (!ticketsCount || typeof ticketsCount !== "object") return [];
    return Object.entries(ticketsCount).map(([key, value]) => {
      const [lat, lng] = key.split("_");
      return {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        ticketsCount: value,
      };
    });
  }, [ticketsCount]);

  // Transform chartData from an object to an array:
  // { category: value } becomes [{ name: category, value: value }, ...]
  const transformedChartData = useMemo(() => {
    if (!chartData || typeof chartData !== "object") return [];
    return Object.entries(chartData).map(([key, value]) => ({
      name: key,
      noOfTickets: value,
    }));
  }, [chartData]);

  console.log(transformedChartData);
  

  // Admin action buttons (static)
  const buttons = [
    {
      label: "Add Employee",
      path: "/admins/addEmployee",
      color:
        "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    },
    {
      label: "Update Employee",
      path: "/admins/updateEmployee",
      color:
        "from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700",
    },
    {
      label: "Read Employee",
      path: "/admins/readEmployee",
      color:
        "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    },
    {
      label: "Delete Employee",
      path: "/admins/deleteEmployee",
      color:
        "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
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
        <h1 className="text-3xl font-extrabold mb-10 bg-clip-text my-8 mx-32">
          Number of tickets raised
        </h1>
        {ticketsLoading && <p className="text-center">Loading tickets...</p>}
        {ticketsError && <p className="text-center text-red-600">{ticketsError}</p>}
        {!ticketsLoading && !ticketsError && (
          <OutageMap
            ticketsData={transformedTicketsData}
            mapCenter={[22.5937, 78.9629]}
            zoom={5}
          />
        )}
      </div>
      <div className="mx-32 my-8">
        <h2 className="text-3xl font-bold mb-4">Tickets Raised As Per the Domain</h2>
        {chartLoading && <p className="text-center">Loading chart data...</p>}
        {chartError && <p className="text-center text-red-600">{chartError}</p>}
        {!chartLoading && !chartError && chartData && (
          <MyBarChart widthVal={"60%"} data={transformedChartData} attribute={"noOfTickets"} color={"#8884d8"} />
        )}
      </div>
    </div>
  );
};

export default AdminHome;
