import axios from "axios";
import { toast } from "react-toastify";


export const updateDetailsFromAPI = async (roles, creditials) => {
  try {
    const response = await axios.put(
      `http://localhost:7000/api/${roles}/guru-pruthvi/password`,
      creditials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    window.location.href = "/login";
    return response.data;
  } catch (error) {
    toast.error("Failed to update employee details. Please try again.");
    console.error(error);
    throw error;
  }
};
