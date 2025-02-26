import axios from "axios";
import { toast } from "react-toastify";
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

export const raiseTicketFromAPI = async (ticketData) => {
    const session = JSON.parse(sessionStorage.getItem("user"))
    const token = session.token;
    if (!token) {
        toast.error("Please LogIn, You are not logged in");
        await delay(2000);
        window.location.href = "/login"
        throw new Error("Please LogIn.");
    }
    const userName = session.user.userName
    if (!token) {
        throw new Error("Please LogIn.");
    }
    try{
        const response = await axios.post(`https://localhost/api/customers/${userName}/tickets`, ticketData, {
            headers: {
                Authorization: `Bearer ${token}`,  // Bearer is a common token type
                "Content-Type": "application/json",
            },
        });
        return response.data;
    }catch(error){
        console.log(error);
        throw new Error("Failed to raise ticket.");
    }
};

