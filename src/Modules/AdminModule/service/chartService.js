import axios from "axios";

export const fetchChartDataFromAPI = async () => {
  const session = JSON.parse(sessionStorage.getItem('user'));
  try{
        if (!session ||!session.token) {
            throw new Error("User not authenticated");
        }
        const token = session.token;
        if (!token) {
            throw new Error("No token found in session storage");
        }
        const username = session.user.userName;
        const response = await axios.get(`http://54.166.126.188:3000/api/admins/${username}/ticketWithDomain`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
        });
        return response.data;
    }catch(error){
        throw new Error(error.response.message.data);
    }
};
