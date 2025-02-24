import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../Redux/signUp/signIn/signInActions"; // adjust path as needed
import { verifyOtp, resetOtp } from "../../Redux/signUp/otp/otpActions"; // adjust path as needed

const OtpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData;
  const [otp, setOtp] = useState("");

  const { loading, error, user } = useSelector((state) => state.signUp);
  const { verified } = useSelector((state) => state.otp);

  useEffect(() => {
    if (!userData) {
      toast.error("No user data found. Please sign up again.");
      navigate("/signup");
    }
  }, [userData, navigate]);

  useEffect(() => {
    if (verified) {
      toast.success("Email verified successfully!");
      dispatch(signUpUser(userData));
      navigate("/login");
      dispatch(resetOtp()); 
    }
  }, [verified, dispatch, navigate, userData]);

  const handleOtpSubmit = (event) => {
    event.preventDefault();
    if (!otp.trim()) {
      toast.error("Please enter the OTP");
      return;
    }
    // Dispatch verifyOtp with necessary payload (e.g., email and otp)
    dispatch(verifyOtp(userData.email, otp));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleOtpSubmit}
        className="bg-white p-6 rounded shadow max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
        <input
          type="text"
          placeholder="Enter the OTP"
          className="border p-2 mb-4 w-full"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full transition duration-200 hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP & Sign Up"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default OtpForm;
