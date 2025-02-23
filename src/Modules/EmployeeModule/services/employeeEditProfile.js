import axios from "axios";
import { toast } from "react-toastify";

export const updateEmployeeDetailsFromAPI = async (id, employeeData) => {
  const sessionObject = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionObject?.token
  if (!token) {
    toast.error("User is not authenticated. Please log in.");
    window.location.href = "/login";
    throw new Error("User is not authenticated. Please log in.");
  }
  if(sessionObject.user.userName !== id){
    toast.error("Unauthorized to update employee details.");
    return;
  }

  try {
    const response = await axios.put(
      `https://localhost:8000/api/employees/${id}`,
      employeeData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to update employee details. Please try again.");
    console.error(error);
    throw error;
  }
};
