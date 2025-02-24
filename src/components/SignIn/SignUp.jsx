import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { requestOtp } from "../../Redux/signUp/otp/otpActions";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.signUp);

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // Changed from location to pincode
  const [pincode, setPincode] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (user) {
      toast.success("Sign Up Successful!");
      navigate("/login");
    }
  }, [error, user, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    if (!agreeTerms) {
      toast.error("You must agree to the terms.");
      return;
    }

    // Prepare user data, now using pincode instead of location
    const userData = {
      name: fullName,
      username: userName,
      phone_Number: phoneNumber,
      email,
      password,
      pincode,
    };

    dispatch(requestOtp({ email }));
    navigate("/otp", { state: { userData } });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: "url('/SignIn.jpg')" }}
    >
      <div className="max-w-md w-full transform transition duration-500 hover:scale-105 m-8">
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 shadow-2xl">
          <h3 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Sign Up
          </h3>
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-5">
              <label className="block text-lg font-bold text-gray-700 mb-1">
                Full Name:
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            {/* User Name */}
            <div className="mb-5">
              <label className="block text-lg font-bold text-gray-700 mb-1">
                User Name:
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your user name"
                required
              />
            </div>
            {/* Phone Number */}
            <div className="mb-5">
              <label className="block text-lg font-bold text-gray-700 mb-1">
                Phone Number:
              </label>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full p-3 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>
            {/* Email */}
            <div className="mb-5">
              <label className="block text-lg font-bold text-gray-700 mb-1">
                Email:
              </label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            {/* Password */}
            <div className="mb-5">
              <label className="block text-lg font-bold text-gray-700 mb-1">
                Password:
              </label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
            </div>
            {/* Confirm Password */}
            <div className="mb-5">
              <label className="block text-lg font-bold text-gray-700 mb-1">
                Confirm Password:
              </label>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
            </div>
            {/* Pincode */}
            <div className="mb-5">
              <label className="block text-lg font-bold text-gray-700 mb-1">
                Pincode:
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Enter your pincode"
                required
              />
            </div>
            {/* Terms and Conditions */}
            <div className="mb-5 flex items-center">
              <input
                type="checkbox"
                className="mr-2 cursor-pointer"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                required
              />
              <label htmlFor="terms" className="text-lg font-bold">
                I agree to the terms and conditions
              </label>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-bold transition duration-200 hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
