
import axios from 'axios';
import { toast } from 'react-toastify';
const deleteEmployeeService = async (employeeId, role, reason) => {
  try {
    const session = JSON.parse(sessionStorage.getItem('user'));
    const token = session.token;
    const username = session.user.userName;
    if (!token) {
      throw new Error('User not authenticated');
    }
    const response = await axios.delete(`http://18.209.26.169:3000/api/admins/${username}/${role}/${employeeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      data: { reason }
    });
    toast.success("Employee deleted successfully.");
    setTimeout(()=>{
      window.location.href="/admins";
    }, 3000)
    return response.data;
  } catch (error) {
    if(error.statusCode === 401) {
      window.location.href="/login";
    }
    console.error("Error deleting employee:", error);
    throw error;
  }
};

export default deleteEmployeeService;
