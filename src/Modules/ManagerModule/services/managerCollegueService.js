import axios from 'axios';
import { toast } from 'react-toastify';

const fetchCollegueFromAPI = async (id) => {
  try {
    const sessionObject = JSON.parse(sessionStorage.getItem('user'))
    const token = sessionObject.token;
    if (!token) {
        toast.error("User is not authenticated. Please log in.");
        window.location.href = "/login";
        throw new Error("User is not authenticated. Please log in.");
    }
    if(sessionObject.user.userName !== id){
        toast.error("Unauthorized can't fetch the details.");
        return;
    }
    const response = await axios.get(`https://localhost:5000/api/managers/${id}/collegue`,{
          headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json"
        },
      }
    );
    
    return response.data;
  } catch (error) {
    toast.error("Failed to update Manager details. Please try again.");
    throw error;
  }
};

export default fetchCollegueFromAPI
