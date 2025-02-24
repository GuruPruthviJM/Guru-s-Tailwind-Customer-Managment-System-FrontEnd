import axios from "axios";
import { toast } from "react-toastify";
// Delay function: returns a promise that resolves after 'ms' milliseconds
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const requestOtpFromAPI = async (data) => {
  console.log(data);
  try {
    const response = await axios.post(
      "https://localhost:7000/api/customers/validateTheOTP",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    const errorMsg = error?.response?.data?.message || "Email is already present";
    toast.error(errorMsg);
    await delay(2000);
    window.location.href = "/login";
    console.error("Error in requestOtpFromAPI:", error);
    throw new Error(errorMsg);
  }
};

export const requestOtpForreset = async (data) => {
  try {
    const response = await axios.post(
      `https://localhost:7000/api/${data.roles}/generateOTP`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    const errorMsg = error?.response?.data?.message || "Failed to request OTP for reset";
    toast.error(errorMsg);
    console.error("Error in requestOtpForreset:", error);
    throw new Error(errorMsg);
  }
};

export const verifyOtpFromAPI = async (data) => {
  console.log("guru", data);
  try {
    const response = await axios.post(
      "https://localhost:7000/api/customers/verifyOTP",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    const errorMsg = error?.response?.data?.message || "Failed to verify OTP";
    toast.error(errorMsg);
    console.error("Error in verifyOtpFromAPI:", error);
    throw new Error(errorMsg);
  }
};
