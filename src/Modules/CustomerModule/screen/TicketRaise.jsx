import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPayments } from "../../../Redux/customer_model/Payments/paymentActions";
import { raiseTicket } from "../../../Redux/customer_model/Ticket/raiseTicketActions";
import { toast } from "react-toastify";

const TicketRaise = () => {
  const [ticketId, setTicketId] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");

  const dispatch = useDispatch();
  const { payments } = useSelector((state) => state.payments);
  const { user } = useSelector((state) => state.auth);
  const { loading, error, ticket } = useSelector((state) => state.ticketRaise);

  useEffect(() => {
    if (user?.user?.userName) {
      dispatch(fetchPayments(user.user.userName));
    }
  }, [dispatch, user]);

  // Extract unique departments from payments
  const departments = useMemo(() => {
    if (!payments || payments.length === 0) return [];
    const deptSet = new Set();
    payments.forEach((payment) => {
      if (payment.department) {
        deptSet.add(payment.department);
      }
    });
    return Array.from(deptSet).map((dept, index) => ({
      id: index,
      value: dept,
      label: dept,
    }));
  }, [payments]);

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedService) {
      toast.error("Please select a domain.");
      return;
    }
    if (!ticketDescription.trim()) {
      toast.error("Please enter a ticket description.");
      return;
    }
    // Prepare ticket data. Adjust field names as required by your API.
    const ticketData = {
      department: selectedService,
      description: ticketDescription
    };
    dispatch(raiseTicket(ticketData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (ticket) {
      toast.success("Ticket raised successfully!");
    }
  }, [error, ticket]);

  return (
    <div className="max-w-[30%] mx-auto my-10">
      <div className="bg-white shadow rounded-xl p-8">
        <div className="text-center mb-5">
          <h3 className="text-xl font-bold">Ticket Details</h3>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Select Service (Department) */}
          <div className="mb-4 mx-1">
            <label htmlFor="services" className="block font-bold mb-1">
              Select Service
            </label>
            <select
              id="services"
              name="services"
              value={selectedService}
              onChange={handleServiceChange}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
              required
            >
              <option value="">-- choose Domain --</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.value}>
                  {dept.label}
                </option>
              ))}
            </select>
          </div>
          {/* Ticket Description */}
          <div className="mb-4 mx-1">
            <label htmlFor="ticketDescription" className="block font-bold mb-1">
              Ticket Description
            </label>
            <textarea
              id="ticketDescription"
              name="ticketDescription"
              rows="5"
              value={ticketDescription}
              onChange={(e) => setTicketDescription(e.target.value)}
              placeholder="Enter ticket description..."
              className="w-full p-2 mt-1 border border-gray-300 rounded h-[150px] resize-y"
              required
            />
          </div>
          {/* Submit Button */}
          <div className="mb-4 mx-1">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-bold transition duration-200 hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TicketRaise;
