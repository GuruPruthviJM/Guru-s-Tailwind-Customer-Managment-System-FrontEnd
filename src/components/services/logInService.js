// src/services/authService.js
import axios from "axios";

const API_URL = "/api/auth/login"; // Base URL for authentication

export const loginService = async (email, password, role) => {
    const response = await axios.post(`https://localhost:7000/api/${role.toLowerCase()}/login`, { email, password }, { withCredentials: true });
    return response.data;
};
