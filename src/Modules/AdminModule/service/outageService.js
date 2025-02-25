import axios from "axios";

export const fetchTicketsCountFromAPI = async () => {
  const session = JSON.parse(sessionStorage.getItem('user'));
  const token = session.token;
  const username = session?.user?.userName;
  console.log(username);
  const response = await axios.get(`https://localhost:3000/api/admins/${username}/ticketWithLatAndLog`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  console.log("guru", response.data);
  return response.data;
};
