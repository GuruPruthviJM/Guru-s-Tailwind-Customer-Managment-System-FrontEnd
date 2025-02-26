import axios from "axios";
import { data } from "react-router";

const addEmployeeService = async (formData) => {
  try {
    const session = JSON.parse(sessionStorage.getItem("user"));
    const token = session?.token;
    const userName = session?.user.userName;
    let data = {}
    if(formData.role === "employees"){
       data = {
        name: formData.name,
        email: formData.email,
        phoneNo: formData.phoneNo,
        department: formData.department,
        password: formData.password,
        designation: formData.designation,
        username: formData.username,
        managerId: formData.managerId
      }
    }else{
      data = {
        name: formData.name,
        email: formData.email,
        phone_Number: formData.phoneNo,
        department: formData.department,
        password: formData.password,
        username: formData.username,
      }
    }
    console.log(data);
    
    if (!token) {
      throw new Error("User not authenticated");
    }
    const response = await axios.post(
      `https://localhost:3000/api/admins/${userName}/${formData.role}`, // Adjust the endpoint if needed
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

export default addEmployeeService;
