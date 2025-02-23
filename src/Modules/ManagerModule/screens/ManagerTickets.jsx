import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../../../Redux/manager_module/managerTicketTable/managerTicketAction";
import { useParams, useNavigate } from "react-router-dom";

const ManagerTicketList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: ticketStatus } = useParams();
  const {user} = useSelector((state)=> state.auth)
  console.log(ticketStatus);
  
  useEffect(() => {
    if(user)
      dispatch(fetchTickets(user?.user?.userName, ticketStatus));
  }, [dispatch, user, ticketStatus]);

  const { tickets, loading, error } = useSelector((state) => state.tickets);

  const handleClick = (ticketId) => {
    navigate(`${ticketId}`);
  };

  if (loading)
    return (
      <div className="container mx-auto mt-5 text-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="container mx-auto mt-5 text-center text-red-600">
        Error: {error}
      </div>
    );
  if (!tickets || tickets.length === 0)
    return (
      <div className="container mx-auto mt-5 text-center">
        No tickets available
      </div>
    );
  if (!(tickets instanceof Array))
    return (
      <div className="container mx-auto mt-5 text-center text-red-600">
        Tickets are not an array
      </div>
    );

  return (
    <div className="container mx-auto mt-5 px-4">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 underline mx-4">
        My Tickets ({ticketStatus})
      </h2>
      <div className="overflow-x-auto shadow-lg rounded-lg mb-10">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#00acc1]">
              <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                Ticket ID
              </th>
              <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                Ticket Type
              </th>
              <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                Ticket Description
              </th>
              <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                Ticket Assigned To
              </th>
              <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                Ticket Raise Date
              </th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr
                key={index}
                onClick={() => handleClick(ticket.ticketId)}
                className="cursor-pointer transition duration-300 group odd:bg-[#f2f2f2] even:bg-white hover:bg-[#438e9c]"
              >
                <td className="py-3 px-6 border-t border-gray-200 text-blue-600 group-hover:bg-black group-hover:text-white text-center">
                  {ticket.ticketId}
                </td>
                <td className="py-3 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white text-center">
                  {ticket.ticketType}
                </td>
                <td className="py-3 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white text-center">
                  {ticket.ticketDescription}
                </td>
                <td className="py-3 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white text-center">
                  {ticket.employeeId}
                </td>
                <td className="py-3 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white text-center">
                  {new Date(ticket.ticketRaiseDate).toLocaleString("en-GB", {
                    hour12: true,
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerTicketList;
