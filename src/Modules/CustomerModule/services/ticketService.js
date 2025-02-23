import axios from "axios";
// src/customer_module/services/ticketService.js
export const fetchTicketsFromAPI = async (id) => {
    const token = JSON.parse(sessionStorage.getItem("user"))?.token;
    if (!token) {
        throw new Error("Please LogIn.");
    }
    
    const response = await axios.get(`https://localhost/api/customers/${id}/tickets`, {
        headers: { 
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json"
        },
    });

    return response.data;
};
