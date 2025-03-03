import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddEmployeeStatus } from "../../../Redux/admin_model/CRUD/addEmployeeAction";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  validateEmail,
  validatePassword,
  validateRole,
  validateFullName,
  validateUserName,
  validatePhoneNumber,
  validatePincode,
} from "../../../components/validation";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state for form inputs
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    managerId: "",
    designation: "",
    department: "",
    role: "",
    email: "",
    phoneNo: "",
    password: "",
    pincode: "",
  });

  // State for agreeTerms
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Get registration status from Redux state
  const { employee, loading, error } = useSelector(
    (state) => state.registerEmployee
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form validation using imported validation functions
  const validateForm = () => {
    // Validate Role
    const roleValidation = validateRole(formData.role);
    if (!roleValidation.isValid) {
      toast.error(roleValidation.message);
      return false;
    }
    // Validate Full Name
    const fullNameValidation = validateFullName(formData.name);
    if (!fullNameValidation.isValid) {
      toast.error(fullNameValidation.message);
      return false;
    }
    // Validate User Name
    const userNameValidation = validateUserName(formData.username);
    if (!userNameValidation.isValid) {
      toast.error(userNameValidation.message);
      return false;
    }
    // Validate Email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      toast.error(emailValidation.message);
      return false;
    }
    // Validate Phone Number
    const phoneValidation = validatePhoneNumber(formData.phoneNo);
    if (!phoneValidation.isValid) {
      toast.error(phoneValidation.message);
      return false;
    }
    // Validate Password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.message);
      return false;
    }
    // Validate Pincode
    const pincodeValidation = validatePincode(formData.pincode);
    if (!pincodeValidation.isValid) {
      toast.error(pincodeValidation.message);
      return false;
    }
    // Role-specific fields
    if (formData.role === "employees") {
      if (!formData.managerId.trim()) {
        toast.error("Manager ID is required for employees");
        return false;
      }
      if (!formData.designation.trim()) {
        toast.error("Designation is required for employees");
        return false;
      }
      if (!formData.department.trim()) {
        toast.error("Department is required for employees");
        return false;
      }
    } else if (formData.role === "managers") {
      if (!formData.department.trim()) {
        toast.error("Department is required for managers");
        return false;
      }
    }
    // Validate Terms and Conditions
    if (!agreeTerms) {
      toast.error("You must agree to the terms.");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    dispatch(fetchAddEmployeeStatus(formData));
  };

  useEffect(() => {
    if (employee) {
      alert("Employee Registered Successfully!");
      // Reset the form after successful registration
      setFormData({
        name: "",
        username: "",
        managerId: "",
        designation: "",
        department: "",
        role: "",
        email: "",
        phoneNo: "",
        password: "",
        pincode: "",
      });
      // Optionally navigate to another page
      // navigate("/employee/dashboard");
    }
  }, [employee, navigate]);

  // Common fields appear for all roles
  const commonFields = [
    { label: "Name", type: "text", name: "name" },
    { label: "User Name", type: "text", name: "username" },
    { label: "Email", type: "email", name: "email" },
    { label: "Phone No", type: "text", name: "phoneNo" },
    { label: "Password", type: "password", name: "password", placeholder: "default password" },
  ];

  // Additional fields based on role selection
  const roleSpecificFields = {
    managers: [{ label: "Department", type: "text", name: "department" }],
    employees: [
      { label: "Manager ID", type: "text", name: "managerId" },
      { label: "Designation", type: "text", name: "designation" },
      { label: "Department", type: "text", name: "department" },
    ],
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md transform transition duration-500 hover:scale-105">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Employee Registration Form
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Role Selection */}
          <div className="mb-4">
            <label className="block font-bold text-lg mb-1">Role:</label>
            <select
              className="w-full p-2 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Choose Role
              </option>
              <option value="employees">Employee</option>
              <option value="managers">Manager</option>
            </select>
          </div>
          {/* Common Fields */}
          {commonFields.map(({ label, type, name, placeholder }) => (
            <div className="mb-4" key={name}>
              <label className="block font-bold text-lg mb-1">
                {label}:
              </label>
              <input
                type={type}
                name={name}
                value={formData[name] || ""}
                onChange={handleChange}
                placeholder={placeholder || ""}
                className="w-full p-2 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
          ))}
          {/* Role Specific Fields */}
          {formData.role && roleSpecificFields[formData.role] && (
            <>
              {roleSpecificFields[formData.role].map(({ label, type, name, placeholder }) => {
                if (name === "department" && formData.role === "managers") {
                  return (
                    <div className="mb-4" key={name}>
                      <label className="block font-bold text-lg mb-1">
                        {label}:
                      </label>
                      <select
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500"
                        required
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="Customer-Experience-Transformation">
                          Customer-Experience-Transformation
                        </option>
                        <option value="Data-and-AI">Data-and-AI</option>
                        <option value="Product-and-Platform-Engineering">
                          Product-and-Platform-Engineering
                        </option>
                        <option value="Global-Design-Studio">
                          Global-Design-Studio
                        </option>
                        <option value="Digital-Transformation-Consulting">
                          Digital-Transformation-Consulting
                        </option>
                        <option value="Infrastructure-Cloud-and-Security">
                          Infrastructure-Cloud-and-Security
                        </option>
                      </select>
                    </div>
                  );
                } else {
                  return (
                    <div className="mb-4" key={name}>
                      <label className="block font-bold text-lg mb-1">
                        {label}:
                      </label>
                      <input
                        type={type}
                        name={name}
                        value={formData[name] || ""}
                        onChange={handleChange}
                        placeholder={placeholder || ""}
                        className="w-full p-2 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                  );
                }
              })}
            </>
          )}
          {/* Terms and Conditions */}
          <div className="mb-5 flex items-center">
            <input
              type="checkbox"
              name="agreeTerms"
              className="mr-2 cursor-pointer"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              required
            />
            <label htmlFor="terms" className="font-bold text-lg">
              I agree to the terms and conditions
            </label>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-md font-bold transition duration-200 hover:bg-blue-700"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          {error && (
            <div className="text-center text-red-600 mt-3">
              Error: {error}
            </div>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddEmployee;
