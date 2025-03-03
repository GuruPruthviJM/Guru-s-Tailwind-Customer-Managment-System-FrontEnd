import axios from "axios";

export const fetchTicketsCountFromAPI = async () => {
  const session = JSON.parse(sessionStorage.getItem('user'));
  const token = session.token;
  const username = session?.user?.userName;
  const response = await axios.get(`http://54.166.126.188:3000/api/admins/${username}/ticketWithLatAndLog`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
