import axios from 'axios';

const updateEmployeeService = async (id, role, formData) => {
  try {
    const session = JSON.parse(sessionStorage.getItem('user'));
    const token = session?.token;
    const user = session.user.userName;
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response = await axios.put(
      `https://localhost:3000/api/admins/${user}/${role}/${id}`, ///:id/employees/:empId
      formData,
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

export default updateEmployeeService;
