import axios from "axios";
import { toast } from "react-toastify";

export const fetchTicketsFromAPI = async (ticketStatus, ticketId) => {
  const sessionObject = JSON.parse(sessionStorage.getItem("user"));
  const token = sessionObject?.token
  if (!token) {
    toast.error("User is not authenticated. Please log in.");
    window.location.href = "/login";
    throw new Error("User is not authenticated. Please log in.");
  }
  try {
    const response = await axios.get(
      `http://18.209.26.169:8000/api/managers/${sessionObject.user.userName}/ticketStatus/${ticketStatus}/${ticketId}`,
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
      `http://18.209.26.169:8000/api/employees/${userName}/tickets/${id}`,
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
      `http://18.209.26.169:8000/api/employees/${userName}/tickets/${id}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Guru Pruthvi");
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