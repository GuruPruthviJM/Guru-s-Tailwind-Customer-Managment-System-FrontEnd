import axios from 'axios';

const fetchEmployeeAPI = async () => {
  try {
    const session = JSON.parse(sessionStorage.getItem('user'));
    const token = session?.token;
    const user = session.user.userName;
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response = await axios.get(
      `http://18.209.26.169:3000/api/admins/${user}/employees`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

export default fetchEmployeeAPI;
