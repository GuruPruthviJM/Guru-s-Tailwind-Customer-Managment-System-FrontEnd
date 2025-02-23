import axios from "axios";
// src/customer_module/services/ticketService.js
export const fetchTicketsFromAPI = async (id, ticketStatus) => {
    const token = JSON.parse(sessionStorage.getItem("user"))?.token;
    if (!token) {
        throw new Error("Please LogIn.");
    }
    if(ticketStatus==="in-progress")
        ticketStatus = "PENDING";
    
    const response = await axios.get(`https://localhost:5000/api/managers/${id}/ticketStatus/${ticketStatus}`, {
        headers: { 
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
        },
    });

    return response.data;
};
