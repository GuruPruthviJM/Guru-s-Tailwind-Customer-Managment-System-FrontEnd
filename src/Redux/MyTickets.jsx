import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "./employee_module/Tickets/ticketActions";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar"; // Import the SearchBar component

const TicketList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tickets, loading, error } = useSelector((state) => state.tickets);
  const customerId = JSON.parse(sessionStorage.getItem("user"))?.user?.userName;
  
  // State for status filter and search bar values
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("ticketDescription"); // Default search field

  // Define search options to be sent to the SearchBar component
  const searchOptions = [
    { value: "ticketId", label: "Ticket ID" },
    { value: "employeeId", label: "Employee ID" },  
    { value: "ticketDescription", label: "Ticket Description" },
    { value: "ticketStatus", label: "Ticket Status" },
    { value: "department", label: "Department" }
  ];

  useEffect(() => {
    if (customerId) {
      dispatch(fetchTickets(customerId));
    }
  }, [dispatch, customerId]);

  // Redirect to login if error indicates login is required
  useEffect(() => {
    if (error && error.includes("Please LogIn")) {
      navigate("/login");
    }
  }, [error, navigate]);

  const handleClick = (ticketId) => {
    navigate(`${ticketId}`);
  };

  // Filter tickets based on status filter and search query on selected field
  const filteredTickets = tickets.filter((ticket) => {
    const statusMatch =
      statusFilter === "All" ||
      ticket.ticketStatus.toUpperCase() === statusFilter.toUpperCase();

    const searchMatch =
      searchQuery.trim() === "" ||
      (ticket[searchField] &&
        ticket[searchField].toString().toLowerCase().includes(searchQuery.toLowerCase()));

    return statusMatch && searchMatch;
  });

  if (loading)
    return (
      <div className="mt-5 mx-auto text-center text-xl">Loading...</div>
    );

  if (!tickets || tickets.length === 0)
    return (
      <div className="mt-5 mx-auto text-center text-xl text-gray-700">
        No ticket has been raised by you.
      </div>
    );

  return (
    <div className="bg-[#f5f5dc] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Main Header */}
        <div className="mb-4">
          <h2 className="text-[#343a40] text-3xl font-semibold text-center">
            My Tickets
          </h2>
        </div>
        {/* Combined Filter Row */}
        <div className="flex justify-between items-center mb-6">
          {/* Left Side: Filter Title */}
          <div className="text-xl font-semibold text-gray-800">
            {statusFilter === "All" ? "All Tickets" : `${statusFilter} Tickets`}
          </div>
          {/* Right Side: Status Filter Dropdown and SearchBar */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <label
                htmlFor="statusFilter"
                className="mr-2 text-lg font-medium text-gray-700"
              >
                Filter by Status:
              </label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All</option>
                <option value="OPEN">Open</option>
                <option value="PENDING">Pending</option>
                <option value="CLOSED">Closed</option>
              </select>
            </div>
            <SearchBar 
              searchField={searchField} 
              setSearchField={setSearchField} 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery}
              searchOptions={searchOptions}
            />
          </div>
        </div>
        {/* Tickets Table */}
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#00acc1]">
                <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                  Ticket ID
                </th>
                <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                  Assigned To
                </th>
                <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                  Ticket Description
                </th>
                <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                  Ticket Department
                </th>
                <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                  Ticket Status
                </th>
                <th className="py-3 px-6 border border-gray-200 text-white text-lg">
                  Ticket Raise Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket, index) => (
                <tr
                  key={index}
                  className="cursor-pointer bg-white transition duration-300 hover:bg-[#438e9c] group"
                  onClick={() => handleClick(ticket.ticketId)}
                >
                  <td className="py-4 px-6 border-t border-gray-200 text-blue-600 group-hover:bg-black group-hover:text-white">
                    {ticket.ticketId}
                  </td>
                  <td className="py-4 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                    {ticket.employeeId}
                  </td>
                  <td className="py-4 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                    {ticket.ticketDescription}
                  </td>
                  <td className="py-4 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                    {ticket.department}
                  </td>
                  <td className="py-4 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                    {ticket.ticketStatus}
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
