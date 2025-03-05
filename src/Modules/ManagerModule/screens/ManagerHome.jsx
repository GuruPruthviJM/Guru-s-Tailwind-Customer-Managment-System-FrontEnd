import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OutageMap from "../../../components/OutageMap";
import MyBarChart from "../../../components/barGraph";
import { fetchTicketsCount } from "../../../Redux/admin_model/outage/outageActions";
import { fetchChartData } from "../../../Redux/admin_model/DomainCountTicket/chartActions";
// import { fetchTimeData } from "../../../Redux/employee_module/stats/statsActions";
import { fetchTicketStats } from "../../../Redux/manager_module/managerHomeStatus/managerStatusActions";

const StatusTickets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  // Manager stats
  const { open, inProgress, closed, loading, error } = useSelector(
    (state) => state.managerStatus
  );
  // Tickets count (outage slice)
  const { ticketsCount, loading: ticketsLoading, error: ticketsError } = useSelector(
    (state) => state.outage
  );
  // Chart data (chart slice)
  const { chartData, loading: chartLoading, error: chartError } = useSelector(
    (state) => state.chart
  );
  // Time data (time slice) - received as an object
  const { timeData, loading: timeLoading, error: timeError } = useSelector(
    (state) => state.time
  );

  const managerID = JSON.parse(sessionStorage.getItem("user"))?.user?.userName;

  // Dispatch actions on mount
  useEffect(() => {
    if (managerID) {
      dispatch(fetchTicketStats(managerID));
      dispatch(fetchTimeData(managerID));
    }
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

  // Transform chartData from object to array format for MyBarChart
  const transformedChartData = useMemo(() => {
    if (!chartData || typeof chartData !== "object") return [];
    return Object.entries(chartData).map(([key, value]) => ({
      name: key,
      noOfTickets: value,
    }));
  }, [chartData]);

  // Transform timeData from object to array format for MyBarChart
  const transformedTimeData = useMemo(() => {
    if (!timeData || typeof timeData !== "object") return [];
    return Object.entries(timeData).map(([key, value]) => ({
      name: key,
      value,
    }));
  }, [timeData]);

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
            Avg Response and Avg Resolution Time
          </h2>
          {timeLoading && <p className="text-center">Loading time data...</p>}
          {timeError && <p className="text-center text-red-600">{timeError}</p>}
          {!timeLoading && !timeError && timeData && (
            <MyBarChart data={transformedTimeData} attribute={"value"} color={"purple"} />
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
            ticketsData={transformedTicketsData}
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
