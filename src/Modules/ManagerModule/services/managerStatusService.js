import axios from 'axios';

const getTicketStatus = async (id) => {
  try {
    const token = JSON.parse(sessionStorage.getItem('user'))?.token
    console.log(token);
    
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response = await axios.get(`https://localhost:5000/api/managers/${id}/ticketStatus`,{
          headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json"
        },
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Error fetching ticket stats:", error);
    throw error;
  }
};

export default getTicketStatus
