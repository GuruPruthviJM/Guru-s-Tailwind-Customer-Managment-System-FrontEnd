import { useState } from "react";

function Forget() {
  const [emailID, setEmailID] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [stage, setStage] = useState(0);

  // Define an array of actions, one for each stage
  const actions = [
    () => setStage(1), // Stage 0: Request OTP => show OTP input
    () => setStage(2), // Stage 1: Submit OTP => show new password fields
    () => {
      // Stage 2: Reset password
      if (newPassword !== confirmNewPassword) {
        alert("Passwords do not match!");
        return;
      }
      alert(`Password reset successful for ${emailID}`);
    },
  ];

  // Mapping stage to button text
  const buttonText = ["Request for OTP", "Submit OTP", "Reset Password"];

  // Mapping stage to form content
  const stageContent = {
    0: (
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
    </div>
  );
}

export default Forget;
