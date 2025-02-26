import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { requestOtpForReset, verifyOtp } from "../../Redux/signUp/otp/otpActions"; // Adjust path as needed
import {updateDetails} from "../../Redux/signUp/resetPassword/resetActions"
import { useNavigate } from "react-router-dom";

function Forget() {
  const [role, setRole] = useState("");
  const [emailID, setEmailID] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [stage, setStage] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get OTP state from Redux (e.g., requestData, requestError, verified, verifyError, resetSuccess, resetError)
  const otpState = useSelector((state) => state.otp);

  // When stage 0 (request OTP) is completed
  useEffect(() => {
    if (otpState.requestData) {
      toast.success("OTP has been sent to your email.");
      setStage(1);
    }
    if (otpState.requestError) {
      toast.error(otpState.requestError);
    }
  }, [otpState.requestData, otpState.requestError]);

  // When stage 1 (OTP verification) is completed
  useEffect(() => {
    if (otpState.verified) {
      toast.success("OTP verified successfully!");
      setStage(2);
      dispatch({ type: "OTP_RESET" });
    }
    if (otpState.verifyError) {
      toast.error(otpState.verifyError);
    }
  }, [otpState.verified, otpState.verifyError, dispatch]);

  // When password reset is successful (optional: you could handle this in another useEffect)
  useEffect(() => {
    if (otpState.resetSuccess) {
      toast.success(`Password reset successful for ${emailID} (${role})`);
      navigate("/login");
    }
    if (otpState.resetError) {
      toast.error(otpState.resetError);
    }
  }, [otpState.resetSuccess, otpState.resetError, emailID, role, navigate]);

  // Mapping stage to form content
  const stageContent = {
    0: (
      <>
        <div className="mb-5">
          <label className="block text-lg font-bold text-gray-700 mb-1">
            Select Role:
          </label>
          <select
            className="w-full p-3 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>
              -- Select Role --
            </option>
            <option value="customers">Customers</option>
            <option value="employees">Employees</option>
            <option value="managers">Managers</option>
            <option value="admins">Admins</option>
          </select>
        </div>
        <div className="mb-5">
          <label className="block text-lg font-bold text-gray-700 mb-1">
            Email ID:
          </label>
          <input
            type="email"
            className="w-full p-3 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            value={emailID}
            onChange={(e) => setEmailID(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
      </>
    ),
    1: (
      <div className="mb-5">
        <label className="block text-lg font-bold text-gray-700 mb-1">
          Enter OTP:
        </label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
        />
      </div>
    ),
    2: (
      <>
        <div className="mb-5">
          <label className="block text-lg font-bold text-gray-700 mb-1">
            New Password:
          </label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block text-lg font-bold text-gray-700 mb-1">
            Confirm Password:
          </label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded transition duration-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
        </div>
      </>
    ),
  };

  // Mapping stage to button text
  const buttonText = ["Request OTP", "Submit OTP", "Reset Password"];

  // Define actions for each stage using Redux for OTP generation/verification and password reset
  const actions = [
    () => {
      // Stage 0: Request OTP via Redux
      if (!role) {
        toast.error("Please select a role.");
        return;
      }
      if (!emailID) {
        toast.error("Please enter your email.");
        return;
      }
      dispatch(requestOtpForReset({ roles: role, email: emailID }));
    },
    () => {
      // Stage 1: Verify OTP via Redux
      if (!otp.trim()) {
        toast.error("Please enter the OTP");
        return;
      }
      dispatch(verifyOtp(emailID, otp));
    },
    () => {
      // Stage 2: Reset password via Redux action
      if (newPassword !== confirmNewPassword) {
        toast.error("Passwords do not match!");
        return;
      }
      dispatch(updateDetails(role, { email: emailID, password: newPassword }));
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    actions[stage]();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{ backgroundImage: "url('/login02.jpg')" }}
    >
      <div className="max-w-md w-full transform transition duration-500 hover:scale-105 m-8">
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-8 shadow-2xl">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Forget Password
          </h2>
          <form onSubmit={handleSubmit}>
            {stageContent[stage]}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-bold transition duration-200 hover:bg-blue-700"
            >
              {buttonText[stage]}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Forget;
