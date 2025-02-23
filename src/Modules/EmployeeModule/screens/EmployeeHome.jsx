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
  if (!tickets || tickets.length === 0)
    return <p className="text-center mt-5">No tickets available</p>;

  // Sort tickets by createdAt in descending order (newest first)
  const sortedTickets = [...tickets].sort(
    (a, b) => parseDate(b.createdAt) - parseDate(a.createdAt)
  );

  // Called when a card is clicked
  const handleCardClick = (ticketId) => {
    navigate(`/employees/ticket/${ticketId}`);
  };

  return (
    <div className="min-h-screen py-10 bg-[#f5f5dc]">
      <h2 className="text-3xl mx-32 font-semibold mb-6 text-gray-800 underline">
        Tickets Assigned
      </h2>
      <div className="flex mx-24 flex-wrap justify-center">
        {sortedTickets.map((ticket, index) => (
          // Pass down an onClick prop to the Cards component
          <Cards key={index} ticket={ticket} onCardClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default TicketParentComponent;
