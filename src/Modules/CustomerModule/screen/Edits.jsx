import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCustomerDetails, resetUpdateCustomerDetails } from "../../../Redux/customer_model/CustomerProfile/customerProfileEditActions"; // adjust path as needed
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customerDetails, loading, error } = useSelector(
    (state) => state.customerDetails
  );
  // Assuming your update reducer is in the same slice. If it's in a separate slice, adjust accordingly.
  const { updateSuccess } = useSelector((state) => state.customerDetailsEdit);
  const { user } = useSelector((state) => state.auth);

  // Local state for form fields
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Auto-populate form fields when customerDetails is available
  useEffect(() => {
    if (customerDetails) {
      setFullName(customerDetails.name || "");
      setUserName(user?.user?.userName || "");
      setPhoneNumber(customerDetails.phone_Number || "");
      setEmail(customerDetails.email || "");
      setLocation(customerDetails.location || "");
    }
  }, [customerDetails, user]);

  // Listen for update success: show toast, reset flag and redirect
  useEffect(() => {
    if (updateSuccess) {
      toast.success("Customer details updated");
      navigate("/customers");
      dispatch(resetUpdateCustomerDetails());
    }
  }, [updateSuccess, dispatch, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    // Prepare the data payload to update
    const updatedData = {
      name: fullName,
      phone_Number: phoneNumber,
      email: email,
      location: location,
    };

    // Dispatch the update action using the user's username as the identifier.
    dispatch(updateCustomerDetails(user?.user?.userName || "", updatedData));
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
            {/* Choose Location */}
            <div className="mb-4">
              <label className="block mb-1 text-base font-semibold">
                Choose Location:
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded bg-white focus:outline-none focus:border-blue-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Chennai">Chennai</option>
                <option value="Gurgaon">Gurgaon</option>
                <option value="Pune">Pune</option>
              </select>
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
    </div>
  );
};

export default EditForm;
