import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../../../Redux/customer_model/Ticket/ticketActions";
import { useParams, useNavigate } from "react-router-dom";

const TicketList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tickets, loading, error } = useSelector((state) => state.tickets);
  const { id: customerId } = useParams();

  useEffect(() => {
    if (customerId) {
      dispatch(fetchTickets(customerId));
    }
  }, [dispatch, customerId]);

  // Redirect to login if error message indicates login is required
  useEffect(() => {
    if (error && error.includes("Please LogIn")) {
      navigate("/login");
    }
  }, [error, navigate]);

  const handleClick = (customerId, ticketId) => {
    navigate(`${ticketId}`);
  };

  if (loading)
    return (
      <div className="mt-5 mx-auto text-center text-xl">
        Loading...
      </div>
    );

  if (!tickets || tickets.length === 0)
    return (
      <div className="mt-5 mx-auto text-center text-xl  text-gray-700">
        No ticket has been raised by you.
      </div>
    );

  return (
    <div className="mt-5 bg-[#f5f5dc] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-[#343a40] text-3xl font-semibold mb-6 text-center">
          My Tickets
        </h2>
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#00acc1]">
                <th className="py-4 px-6 text-white text-lg">Ticket ID</th>
                <th className="py-4 px-6 text-white text-lg">Ticket Type</th>
                <th className="py-4 px-6 text-white text-lg">Ticket Description</th>
                <th className="py-4 px-6 text-white text-lg">Ticket Status</th>
                <th className="py-4 px-6 text-white text-lg">Ticket Raise Date</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket, index) => (
                <tr
                  key={index}
                  className="cursor-pointer transition duration-300 hover:bg-[#438e9c] group"
                  onClick={() => handleClick(customerId, ticket.ticketId)}
                >
                  <td className="py-4 px-6 border-t border-gray-200 text-blue-600 group-hover:bg-black group-hover:text-white">
                    {ticket.ticketId}
                  </td>
                  <td className="py-4 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                    {ticket.ticketType}
                  </td>
                  <td className="py-4 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                    {ticket.ticketDescription}
                  </td>
                  <td className="py-4 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                    {ticket.ticketStatus}
                  </td>
                  <td className="py-4 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                    {new Date(ticket.ticketRaiseDate).toLocaleDateString("en-GB")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {error && !error.includes("Please LogIn") && (
          <div className="mt-5 text-center text-red-600 text-xl">
            Error: {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketList;
