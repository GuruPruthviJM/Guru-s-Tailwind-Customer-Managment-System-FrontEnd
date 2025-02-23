import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketStats } from "../../../Redux/manager_module/managerHomeStatus/managerStatusActions";
import { useNavigate } from "react-router-dom";

const StatusTickets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { open, inProgress, closed, loading, error } = useSelector(
    (state) => state.managerStatus
  );

  // Get managerID from sessionStorage
  const managerID = JSON.parse(sessionStorage.getItem("user"))?.user?.userName;

  useEffect(() => {
    dispatch(fetchTicketStats(managerID));
  }, [dispatch, managerID]);

  if (loading)
    return <div className="text-center mt-5">Loading...</div>;
  if (error)
    return (
      <div className="text-center mt-5 text-red-600">
        Error fetching ticket stats: {error}
      </div>
    );
  if (!open && !inProgress && !closed)
    return <div className="text-center mt-5">No tickets available</div>;

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

  return (
    <div className="container mx-auto mt-4 px-4">
      <h2 className="mb-10 mx-20 underline text-3xl font-bold">Status Ticket</h2>
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
    </div>
  );
};

export default StatusTickets;
