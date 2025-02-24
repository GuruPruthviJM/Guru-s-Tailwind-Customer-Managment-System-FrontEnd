import axios from 'axios';
import { toast } from 'react-toastify';

export const fetchManagerDetailsFromAPI = async (id) => {
  const sessionObject = JSON.parse(sessionStorage.getItem('user'));
  const token = sessionObject?.token;
  
  if (!token) {
    toast.error("User is not authenticated. Please log in.");
    throw new Error("User is not authenticated. Please log in.");
  }

  // Use the appropriate URL based on whether the session's userName matches the provided id
  const url =
    sessionObject.user.userName !== id
      ? `https://localhost:5000/api/managers/${sessionObject.user.userName}/collegue/${id}`
      : `https://localhost:5000/api/managers/${id}`;

  try {
    const response = await axios.get(url, {
      headers: { 
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json'
      },
    });
    return response.data;
  } catch (error) {
    toast.error("Failed to fetch customer details. Please log in.");
    throw error;
  }
};
