import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchCustomerDetailsFromAPI = async (id) => {
  const token = JSON.parse(sessionStorage.getItem("user"))?.token;
  if (!token) {
    toast.error("User is not authenticated. Please log in.");
    window.location.href = "/login";
    throw new Error("User is not authenticated. Please log in.");
  }
  
  try {
    const response = await axios.get(`https://localhost/api/customers/${id}`, {
      headers: { 
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch customer details. Please log in.");
    window.location.href = "/login";
    sessionStorage.removeItem("user");
    throw error;
  }
};
