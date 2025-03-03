import axios from "axios";
import { toast } from "react-toastify";
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTicketsFromAPI = async (id) => {
    const token = JSON.parse(sessionStorage.getItem("user"))?.token;
    if (!token) {
        throw new Error("Please LogIn.");
    }
    console.log("Guru");
    
    const response = await axios.get(`http://54.166.126.188:8080/api/customers/${id}/tickets`, {
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
        const response = await axios.post(`http://54.166.126.188:8080/api/customers/${userName}/tickets`, ticketData, {
            headers: {
                Authorization: `Bearer ${token}`,  // Bearer is a common token type
                "Content-Type": "application/json",
            },
        });
        toast.success("Ticket raised successfully.");
        await delay(2000);
        window.location.href = "/customers"
        return response.data;
    }catch(error){
        toast.error("Failed to raise ticket. Please try again.");
        await delay(2000);
        window.location.href = "/customers"
        throw new Error("Failed to raise ticket.");
    }
};

