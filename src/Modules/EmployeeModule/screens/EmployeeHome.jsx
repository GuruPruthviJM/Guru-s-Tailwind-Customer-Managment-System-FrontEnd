import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cards from "../../../components/EmployeeCards";
import { fetchTickets } from "../../../Redux/employee_module/Tickets/ticketActions";

const TicketParentComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tickets, loading, error } = useSelector((state) => state.tickets);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.user?.userName) {
      dispatch(fetchTickets(user.user.userName));
    }
  }, [dispatch, user]);

  // Helper to parse "DD/MM/YYYY"
  function parseDate(dateString) {
    if (!dateString) return new Date(0);
    const [day, month, year] = dateString.split("/");
    return new Date(year, month - 1, day);
  }

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-red-600">{error}</p>;

  // Filter to include only tickets with "open" status
  const openTickets = tickets.filter(
    (ticket) => ticket //.ticketStatus.toLowerCase() === "open"
  );

  // Sort the open tickets by createdAt in descending order (newest first)
  const sortedTickets = [...openTickets].sort(
    (a, b) => parseDate(b.createdAt) - parseDate(a.createdAt)
  );

  if (!sortedTickets || sortedTickets.length === 0)
    return <p className="text-center mt-5 flex justify-center">No tickets have been assigned :)</p>;

  // Called when a card is clicked
  const handleCardClick = (ticketId) => {
    navigate(`/employees/tickets/${ticketId}`);
  };

  return (
    <div className="min-h-screen py-10 bg-[#f5f5dc]">
      <h2 className="text-3xl mx-32 font-semibold mb-6 text-gray-800 underline">
        Tickets Assigned
      </h2>
      <div className="flex mx-24 flex-wrap justify-center">
        {sortedTickets.map((ticket, index) => (
          <Cards key={ticket.ticketId || index} ticket={ticket} onCardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default TicketParentComponent;
