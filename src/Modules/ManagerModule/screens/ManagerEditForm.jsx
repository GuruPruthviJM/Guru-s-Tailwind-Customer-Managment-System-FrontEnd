import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateManagerDetails, resetUpdateManagerDetails } from "../../../Redux/manager_module/details/editActions";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { validateFullName, validateEmail, validatePhoneNumber } from "../../../components/validation";

const ManagerEditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employeeDetails, loading, error } = useSelector((state) => state.managerDetails);
  const { updateSuccess } = useSelector((state) => state.managerDetailsEdit);
  const { user } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    if (employeeDetails) {
      setFullName(employeeDetails.name || "");
      setUserName(user?.user?.userName || "");
      setPhoneNumber(employeeDetails.phone_Number || "");
      setEmail(employeeDetails.email || "");
    }
  }, [employeeDetails, user]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Manager details updated", { position: "top-right" });
      navigate("/managers");
      dispatch(resetUpdateManagerDetails());
    }
  }, [updateSuccess, dispatch, navigate]);

  const validateForm = () => {
    const fullNameValidation = validateFullName(fullName);
    if (!fullNameValidation.isValid) {
      toast.error(fullNameValidation.message);
      return false;
    }
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      toast.error(emailValidation.message);
      return false;
    }
    const phoneValidation = validatePhoneNumber(phoneNumber);
    if (!phoneValidation.isValid) {
      toast.error(phoneValidation.message);
      return false;
    }
    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions");
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const updatedData = {
      name: fullName,
      phone_Number: phoneNumber,
      email: email,
    };

    dispatch(updateManagerDetails(user?.user?.userName || "", updatedData));
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5 text-red-600">{error}</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f5dc] px-4">
      <div className="max-w-md w-full m-8 transform transition duration-500 hover:scale-105">
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-center text-2xl font-bold mb-6 text-[#00acc1]">
            Edit Form
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label className="block mb-1 text-base font-semibold">
                Full Name:
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            {/* User Name - Read Only */}
            <div className="mb-4">
              <label className="block mb-1 text-base font-semibold">
                User Name:
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                value={userName}
                readOnly
                placeholder="User name cannot be edited"
                required
              />
            </div>
            {/* Phone Number */}
            <div className="mb-4">
              <label className="block mb-1 text-base font-semibold">
                Phone Number:
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>
            {/* Email */}
            <div className="mb-4">
              <label className="block mb-1 text-base font-semibold">
                Email:
              </label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            {/* Terms and Conditions */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
              <label htmlFor="terms" className="text-base">
                I agree to the terms and conditions
              </label>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded font-bold transition duration-200 hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManagerEditForm;
