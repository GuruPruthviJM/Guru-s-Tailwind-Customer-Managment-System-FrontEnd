import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateEmployeeStatus } from "../../../Redux/admin_model/CRUD/updateEmployeeAction";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {
  validateEmail,
  validateRole,
  validateFullName,
  validatePhoneNumber,
} from "../../../components/validation";

const UpdateEmployeePanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state for form inputs
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [role, setRole] = useState("");

  // Redux state for update status
  const { employee, loading, error } = useSelector(
    (state) => state.updateEmployee
  );

  // Validate form inputs before dispatching update action
  const validateForm = () => {
    // Validate Role
    const roleValidation = validateRole(role);
    if (!roleValidation.isValid) {
      toast.error(roleValidation.message);
      return false;
    }
    // Validate Employee ID (required)
    if (!employeeId.trim()) {
      toast.error("Employee ID is required");
      return false;
    }
    // Ensure at least one update field is provided
    if (!name.trim() && !email.trim() && !phoneNo.trim()) {
      toast.error("Please provide at least one of Name, Email, or Phone Number.");
      return false;
    }
    // Validate Name if provided
    if (name.trim()) {
      const fullNameValidation = validateFullName(name);
      if (!fullNameValidation.isValid) {
        toast.error(fullNameValidation.message);
        return false;
      }
    }
    // Validate Email if provided
    if (email.trim()) {
      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        toast.error(emailValidation.message);
        return false;
      }
    }
    // Validate Phone Number if provided
    if (phoneNo.trim()) {
      const phoneValidation = validatePhoneNumber(phoneNo);
      if (!phoneValidation.isValid) {
        toast.error(phoneValidation.message);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    // Build updateData with only provided fields
    let updateData = {};
    if (name.trim() !== "") updateData.name = name;
    if (email.trim() !== "") updateData.email = email;
    if (phoneNo.trim() !== "") {
      // Depending on role, choose proper key for phone number
      if (role === "employees") {
        updateData.phoneNo = phoneNo;
      } else {
        updateData.phone_Number = phoneNo;
      }
    }

    dispatch(fetchUpdateEmployeeStatus(employeeId, role, updateData));
  };

  useEffect(() => {
    if (employee) {

      setEmployeeId("");
      setName("");
      setEmail("");
      setPhoneNo("");
    }
  }, [employee, navigate]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Update Employee
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-bold text-lg mb-1">Role:</label>
            <select
              className="w-full p-2 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>
                Choose Role
              </option>
              <option value="employees">Employee</option>
              <option value="managers">Manager</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-bold text-lg mb-1">
              Employee ID:
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-lg mb-1">Name:</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter new name (optional)"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-lg mb-1">Email:</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter new email (optional)"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-lg mb-1">
              Phone Number:
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              placeholder="Enter new phone number (optional)"
            />
          </div>
          {loading ? (
            <div className="text-center text-blue-500">Updating...</div>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-bold transition duration-200 hover:bg-blue-700"
            >
              Update Employee
            </button>
          )}
          {error && (
            <div className="text-center text-red-600 mt-3">Error: {error}</div>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateEmployeePanel;
