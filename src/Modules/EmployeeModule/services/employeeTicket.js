import axios from "axios";
import { toast } from "react-toastify";

export const fetchTicketsFromAPI = async (id) => {
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
      `https://localhost:8000/api/employees/${id}/tickets`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch ticket details. Please try again.");
    console.error(error);
    throw error;
  }
};

export const fetchSpecificTicketFromAPI = async (id) => {
  const sessionObject = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionObject?.token
  if (!token) {
    toast.error("User is not authenticated. Please log in.");
    window.location.href = "/login";
    throw new Error("User is not authenticated. Please log in.");
  }
  const userName = sessionObject?.user?.userName
  try {
    const response = await axios.get(
      `https://localhost:8000/api/employees/${userName}/tickets/${id}`,
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
}

export const updateSpecificTicketFromAPI = async (id, updatedData) => {
  const sessionObject = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionObject?.token
  if (!token) {
    toast.error("User is not authenticated. Please log in.");
    window.location.href = "/login";
    throw new Error("User is not authenticated. Please log in.");
  }
  const userName = sessionObject?.user?.userName
  try {
    const response = await axios.put(
      `https://localhost:8000/api/employees/${userName}/tickets/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    toast.success("Ticket updated successfully")
    setTimeout(()=>{
      window.location.href="/employees" 
    }, 2000)
    return response.data;
  } catch (error) {
    toast.error("Failed to update ticket Status. Please try again.");
    console.error(error);
    throw error;
  }
}