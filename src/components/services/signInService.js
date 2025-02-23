
import axios from "axios";

export const signUpService = async (fullName, username, email, phoneNumber, password) => {
    const response = await axios.post(
        `https://localhost:7000/api/customers`,
        { name:fullName, username, email, phone_Number:phoneNumber, password },
        { withCredentials: true }
    );
    return response.data;
};
