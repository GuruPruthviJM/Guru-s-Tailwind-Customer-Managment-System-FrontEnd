import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUpdateEmployeeStatus } from "../../../Redux/admin_model/CRUD/updateEmployeeAction";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Build an updateData object with only the filled fields
    let updateData = {};
    if (name.trim() !== "") updateData.name = name;
    if (email.trim() !== "") updateData.email = email;
    if (phoneNo.trim() !== "") updateData.phoneNo = phoneNo;

    if (Object.keys(updateData).length === 0) {
      toast.error("Please provide at least one of Name, Email or Phone Number.");
      return;
    }
    console.log(updateData);
    

    dispatch(fetchUpdateEmployeeStatus(employeeId, role, updateData));
  };

  useEffect(() => {
    if (employee) {
      toast.success("Employee updated successfully.");
      setEmployeeId("");
      setName("");
      setEmail("");
      setPhoneNo("");
      setTimeout(() =>{
        navigate("/admins")
    },3000)
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
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-lg mb-1">Email:</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
          </div>
          {loading ? (
            <div className="w-full text-center bg-blue-600 text-white py-3 rounded-md font-bold transition duration-200 hover:bg-blue-700">Updating...</div>
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
