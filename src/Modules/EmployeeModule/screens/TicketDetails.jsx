import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTickets, updateTicketStatus } from "../../../Redux/employee_module/Tickets/ticketActions";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const EmployeeTicketDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // Assume your Redux state now holds ticket details in "tickets"
  const { tickets, loading, error } = useSelector((state) => state.ticketEmployeeReducer);
  const ticketDetails = tickets.find((ticket) => ticket.ticketId === id);

  const { user } = useSelector((state) => state.auth);

  // Fetch ticket details when the component mounts
  useEffect(() => {
    if (user?.user?.userName) {
      dispatch(fetchTickets(user.user.userName));
    }
  }, [dispatch, user]);

  // Helper function to conditionally style the status button based on ticketStatus
  const getStatusButtonStyle = (status) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-500 hover:bg-green-700";
      case "pending":
        return "bg-yellow-500 hover:bg-yellow-700";
      case "closed":
        return "bg-red-500 cursor-not-allowed";
      default:
        return "bg-blue-500 hover:bg-blue-700";
    }
  };

  // Function to handle ticket status update on button click
  const handleStatusUpdate = () => {
    if (!ticketDetails) return;
    
    const statusMapping = {
      open: "PENDING",
      pending: "CLOSED",
    };
  
    const currentStatus = ticketDetails.ticketStatus.toLowerCase();
    const newStatus = statusMapping[currentStatus];
    
    if (!newStatus) return; // if ticket is already closed or current status isn't mapped
    
    const updatedData = { ticketStatus: newStatus };
    dispatch(updateTicketStatus(id, updatedData));
  };
  
  // Updated renderValue function to handle date formatting in Indian format
  const renderValue = (key, value) => {
    // For ticket raise date, format as per Indian locale
    if (key === "ticketRaiseDate" && value) {
      return new Date(value).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      });
    }

    if (key === "ticketStatusHistory" && Array.isArray(value)) {
      return (
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Changed At</th>
            </tr>
          </thead>
          <tbody>
            {value.map((history, index) => (
              <tr key={history._id || index}>
                <td className="py-2 px-4 border">{history.status}</td>
                <td className="py-2 px-4 border">
                  {new Date(history.changedAt).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    // For other values, if it's an object, try to display its name; otherwise, stringify it.
    if (typeof value === "object" && value !== null) {
      return value.name ? value.name : JSON.stringify(value);
    }
    return value;
  };

  // Define the fields to display and their labels for a ticket
  const fieldsToDisplay = [
    { key: "ticketId", label: "Ticket ID" },
    { key: "customerId", label: "Customer ID" },
    { key: "ticketDescription", label: "Ticket Description" },
    { key: "ticketStatus", label: "Ticket Status" },
    { key: "department", label: "Department" },
    { key: "latitude", label: "Latitude" },
    { key: "longitude", label: "Longitude" },
    { key: "ticketRaiseDate", label: "Ticket Raise Date" },
    { key: "ticketStatusHistory", label: "Ticket Status History" },
  ];

  return (
    <div className="container mx-auto mt-5 px-4">
      <h2 className="text-3xl font-semibold mb-6 underline text-left text-gray-800">
        Ticket Details
      </h2>

      {/* Display loading or error messages */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {ticketDetails && (
        <div>
          <div className="overflow-x-auto shadow-lg rounded-lg my-5">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#00acc1]">
                  <th className="py-4 px-6 border border-gray-200 text-white text-lg">
                    Field
                  </th>
                  <th className="py-4 px-6 border border-gray-200 text-white text-lg">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody>
                {fieldsToDisplay.map(({ key, label }, index) => {
                  // Skip ticketStatusHistory if the ticket status is open or no history exists
                  if (
                    key === "ticketStatusHistory" &&
                    (ticketDetails.ticketStatus.toLowerCase() === "open" ||
                      (ticketDetails[key] && ticketDetails[key].length === 0))
                  ) {
                    return null;
                  }
                  return (
                    <tr
                      key={index}
                      className="cursor-pointer transition duration-300 hover:bg-[#438e9c] group odd:bg-[#f2f2f2] even:bg-white"
                    >
                      <td className="py-3 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                        {label}
                      </td>
                      <td className="py-3 px-6 border-t border-gray-200 group-hover:bg-black group-hover:text-white">
                        {renderValue(key, ticketDetails[key]) || "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Button below the table displaying the ticketStatus with conditional styling */}
          <button
            disabled={ticketDetails.ticketStatus.toLowerCase() === "closed"}
            className={`${getStatusButtonStyle(ticketDetails.ticketStatus)} text-white font-bold py-2 px-4 rounded`}
            onClick={handleStatusUpdate}
          >
            {ticketDetails.ticketStatus}
          </button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default EmployeeTicketDetails;
