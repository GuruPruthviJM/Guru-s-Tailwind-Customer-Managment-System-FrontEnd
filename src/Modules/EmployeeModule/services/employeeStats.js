import axios from "axios";
import { toast } from "react-toastify";
import { delay } from "../../CustomerModule/services/ticketService";

export const fetchTimeDataFromAPI = async (managerID) => {
  // Replace the URL with your actual backend endpoint and safe port
  const sessionObject = JSON.parse(sessionStorage.getItem("user"))
  const token = sessionObject?.token;
  const userName = sessionObject?.user.userName
  if(!token){
    toast.error("Please login first!!")
    await delay(2000)
    window.location.href = "/login"
  }
  const response = await axios.get(`https://18.209.26.169:5000/api/managers/${userName}/stats`, {
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
  });
  return response.data;
};
