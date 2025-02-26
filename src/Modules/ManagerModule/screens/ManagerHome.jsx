import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketStats } from "../../../Redux/manager_module/managerHomeStatus/managerStatusActions";
import { useNavigate } from "react-router-dom";
import OutageMap from "../../../components/OutageMap";
import MyBarChart from "../../../components/barGraph";
import { fetchTicketsCount } from "../../../Redux/admin_model/outage/outageActions";
import { fetchChartData } from "../../../Redux/admin_model/DomainCountTicket/chartActions";

const StatusTickets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // All hooks are always called
  const { open, inProgress, closed, loading, error } = useSelector(
    (state) => state.managerStatus
  );
  const { ticketsCount, loading: ticketsLoading, error: ticketsError } = useSelector(
    (state) => state.outage
  );
  const { chartData, loading: chartLoading, error: chartError } = useSelector(
    (state) => state.chart
  );

  // Get managerID from sessionStorage
  const managerID = JSON.parse(sessionStorage.getItem("user"))?.user?.userName;

  useEffect(() => {
    dispatch(fetchTicketStats(managerID));
  }, [dispatch, managerID]);

  useEffect(() => {
    dispatch(fetchTicketsCount());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchChartData());
  }, [dispatch]);

  // Transform ticketsCount data from { "lat_lng": count } to an array of objects
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

  // Transform chartData from an object to an array
  const transformedChartData = useMemo(() => {
    if (!chartData || typeof chartData !== "object") return [];
    return Object.entries(chartData).map(([key, value]) => ({
      name: key,
      noOfTickets: value,
    }));
  }, [chartData]);

  // Define ticket stats with Tailwind classes for background colors
  const ticketStats = [
    {
      title: "Open Tickets",
      count: open,
      color: "bg-red-500",
      path: "/tickets/open",
    },
    {
      title: "In Progress",
      count: inProgress,
      color: "bg-yellow-500",
      path: "/tickets/in-progress",
    },
    {
      title: "Closed",
      count: closed,
      color: "bg-green-500",
      path: "/tickets/closed",
    },
  ];

  // Static tickets for the map (if needed)
  const staticTickets = [
    { lat: 19.076, lng: 72.8777, ticketsCount: 3, popupText: "Mumbai: 3 tickets" },
    { lat: 28.7041, lng: 77.1025, ticketsCount: 6, popupText: "Delhi: 6 tickets" },
    { lat: 12.9716, lng: 77.5946, ticketsCount: 4, popupText: "Bangalore: 4 tickets" },
    { lat: 13.0827, lng: 80.2707, ticketsCount: 7, popupText: "Chennai: 7 tickets" },
  ];

  const time = [
    {name: "avgResolution", value: 157},
    {name: "avgResponce", value: 188.25}
  ]

  return (
    <div className="container mx-auto mt-4 px-4">
      <h2 className="mb-10 mx-20 underline text-3xl font-bold">Status Ticket</h2>

      {/* Manager status messages */}
      {loading && <div className="text-center mt-5">Loading...</div>}
      {error && (
        <div className="text-center mt-5 text-red-600">
          Error fetching ticket stats: {error}
        </div>
      )}
      {(!open && !inProgress && !closed) && !loading && !error && (
        <div className="text-center mt-5">No tickets available</div>
      )}


      {/* Ticket stats cards */}
      <div className="flex flex-wrap -mx-2 justify-center">
        {ticketStats.map((ticket, index) => (
          <div key={index} className="w-full md:w-1/3 px-2 mb-4 h-32">
            <div
              className={`cursor-pointer rounded p-3 text-white text-center ${ticket.color} transition-transform duration-200 hover:scale-105 max-w-xs mx-auto`}
              onClick={() => navigate(`/managers${ticket.path}`)}
            >
              <h5 className="text-lg font-bold underline">{ticket.title}</h5>
              <h2 className="mt-2 text-3xl font-bold underline">
                {ticket.count || 0}
              </h2>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-8 border-gray-300" />

      {/* Bar Charts */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 mx-32 my-8">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Tickets Raised As Per the Domain
          </h2>
          {chartLoading && <p className="text-center">Loading chart data...</p>}
          {chartError && <p className="text-center text-red-600">{chartError}</p>}
          {!chartLoading && !chartError && chartData && (
            <MyBarChart data={transformedChartData} attribute={"noOfTickets"} color={"#8884d8"} />
          )}
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Avg Responce and Avg Resoulution Time
          </h2>
          {chartLoading && <p className="text-center">Loading chart data...</p>}
          {chartError && <p className="text-center text-red-600">{chartError}</p>}
          {!chartLoading && !chartError && chartData && (
            <MyBarChart data={time} color={"purple"} attribute={"value"} />
          )}
        </div>
      </div>

      <hr className="my-8 border-gray-300" />

      {/* Outage Map */}
      <div>
        <h1 className="text-3xl font-extrabold mb-10 bg-clip-text my-8 mx-32">
          Number of tickets raised
        </h1>
        {ticketsLoading && <p className="text-center">Loading tickets...</p>}
        {ticketsError && <p className="text-center text-red-600">{ticketsError}</p>}
        {!ticketsLoading && !ticketsError && (
          <OutageMap
            ticketsData={staticTickets}
            mapCenter={[22.5937, 78.9629]}
            zoom={5}
          />
        )}
      </div>

      <hr className="my-8 border-gray-300" />
    </div>
  );
};

export default StatusTickets;
