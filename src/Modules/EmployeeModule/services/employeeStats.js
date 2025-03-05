import axios from "axios";
import { toast } from "react-toastify";
import { delay } from "../../CustomerModule/services/ticketService";

export const fetchTimeDataFromAPI = async () => {
  // Replace the URL with your actual backend endpoint and safe port
  const sessionObject = JSON.parse(sessionStorage.getItem("user"))
  const token = sessionObject?.token;
  const userName = sessionObject?.user.userName
  if(!token){
    toast.error("Please login first!!")
    await delay(2000)
    window.location.href = "/login"
  }
  const response = await axios.get(`http://18.209.26.169:8000/api/employees/${userName}/stats`, {
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
  });
  return response.data;
};
