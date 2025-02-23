import axios from "axios";
import { toast } from "react-toastify";

export const fetchCollegueFromAPI = async (id) => {
  const sessionObject = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionObject?.token
  
  if (!token) {
    toast.error("User is not authenticated. Please log in.");
    window.location.href = "/login";
    throw new Error("User is not authenticated. Please log in.");
  }
  if(sessionObject.user.userName !== id){
    toast.error("Unauthorized can't fetch the details.");
    return;
  }

  try {
    const response = await axios.get(
      `https://localhost:8000/api/employees/${id}/collegue`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to update customer details. Please try again.");
    console.error(error);
    throw error;
  }
};
