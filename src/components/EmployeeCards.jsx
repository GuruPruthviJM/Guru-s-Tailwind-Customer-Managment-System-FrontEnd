import React from "react";

const EmployeeCards = ({ ticket, onCardClick }) => {
  // We'll handle the click on the same div that defines width & spacing
  return (
    <div
      onClick={() => onCardClick(ticket.ticketId)}
      className="w-full md:w-1/3 flex justify-center p-4 cursor-pointer"
    >
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg p-6 transition-transform duration-200 ease-in-out hover:scale-105">
        <h5 className="text-xl font-bold text-center mb-4 text-[#00acc1]">
          {ticket.ticketId}
        </h5>
        <div className="text-sm text-gray-700 space-y-2">
          <p>
            <strong>Customer ID:</strong> {ticket.customerId}
          </p>
          <p>
            <strong>Ticket Type:</strong> {ticket.ticketType}
          </p>
          <p>
            <strong>Description:</strong> {ticket.ticketDescription}
          </p>
          <p>
            <strong>Status:</strong> {ticket.ticketStatus}
          </p>
          <p>
            <strong>Raise Date:</strong>{" "}
            {new Date(ticket.ticketRaiseDate).toLocaleDateString("en-GB")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCards;
