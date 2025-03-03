import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { requestOtp } from "../../Redux/signUp/otp/otpActions";
import {
  validateFullName,
  validateUserName,
  validatePhoneNumber,
  validateEmail,
  validatePassword,
  validatePincode,
} from "../validation";

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
  const [pincode, setPincode] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Toggle states for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    // Validate Full Name
    const fullNameValidation = validateFullName(fullName);
    if (!fullNameValidation.isValid) {
      toast.error(fullNameValidation.message);
      return;
    }

    // Validate User Name
    const userNameValidation = validateUserName(userName);
    if (!userNameValidation.isValid) {
      toast.error(userNameValidation.message);
      return;
    }

    // Validate Phone Number
    const phoneValidation = validatePhoneNumber(phoneNumber);
    if (!phoneValidation.isValid) {
      toast.error(phoneValidation.message);
      return;
    }

    // Validate Email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      toast.error(emailValidation.message);
      return;
    }

    // Validate Password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      toast.error(passwordValidation.message);
      return;
    }

    // Check if password matches confirm password
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // Validate Pincode
    const pincodeValidation = validatePincode(pincode);
    if (!pincodeValidation.isValid) {
      toast.error(pincodeValidation.message);
      return;
    }

    // Validate Terms and Conditions
    if (!agreeTerms) {
      toast.error("You must agree to the terms.");
      return;
    }

    // Prepare user data
    const userData = {
      name: fullName,
      username: userName,
      phone_Number: phoneNumber,
      email,
      password,
      pincode,
    };

    // Request OTP and navigate to OTP screen with user data in state
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
            {/* Password with Eye Icon */}
            <div className="mb-5 relative">
              <label className="block text-lg font-bold text-gray-700 mb-1">
                Password:
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-3 border border-gray-300 rounded-md pr-10 transition duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
              />
              <div
                className="absolute inset-y-0 right-3 flex cursor-pointer my-12"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.27-2.943-9.543-7a9.953 9.953 0 012.432-3.54M6.165 6.165A9.953 9.953 0 0112 5c4.478 0 8.27 2.943 9.543 7a9.953 9.953 0 01-1.41 2.592"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </div>
            </div>
            {/* Confirm Password with Eye Icon */}
            <div className="mb-5 relative">
              <label className="block text-lg font-bold text-gray-700 mb-1">
                Confirm Password:
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full p-3 border border-gray-300 rounded-md pr-10 transition duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                required
              />
              <div
                className="absolute inset-y-0 right-3 flex cursor-pointer my-12"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.27-2.943-9.543-7a9.953 9.953 0 012.432-3.54M6.165 6.165A9.953 9.953 0 0112 5c4.478 0 8.27 2.943 9.543 7a9.953 9.953 0 01-1.41 2.592"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </div>
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
