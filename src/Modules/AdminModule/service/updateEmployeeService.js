import axios from 'axios';
import { toast } from 'react-toastify';

const updateEmployeeService = async (id, role, formData) => {
  try {
    const session = JSON.parse(sessionStorage.getItem('user'));
    const token = session?.token;
    const user = session.user.userName;
    if (!token) {
      throw new Error('User not authenticated');
    }
    // if(role === 'manager'){

    // }
    const response = await axios.put(
      `http://localhost:3000/api/admins/${user}/${role}/${id}`, ///:id/employees/:empId
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );
    toast.success("Employee updated successfully")
    setTimeout(()=>{
      window.location.href = "/admins"
    }, 3000)
    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

export default updateEmployeeService;
