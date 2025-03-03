
import axios from "axios";
import { toast } from "react-toastify";

export const signUpService = async (customerData) => {
    try{
        const response = await axios.post(
            `http://localhost:7000/api/customers`,
            customerData,
            { withCredentials: true }
        );
        toast.success("Signed up successfully");
        return response.data;
    }catch(error){
        toast.error("Not signed up", error)
        throw new Error(error.response.data.message);
    }
};
