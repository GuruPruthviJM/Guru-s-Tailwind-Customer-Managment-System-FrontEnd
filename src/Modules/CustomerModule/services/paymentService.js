import axios from 'axios';

export const fetchPaymentsFromAPI = async (id) => {
    const token = JSON.parse(sessionStorage.getItem("user")).token; // Get token from sessionStorage
    

    if (!token) {
        throw new Error("User is not authenticated. Please log in.");
    }

    const response = await axios.get(`https://localhost/api/customers/${id}/payments`, {
        headers: { 
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json'
        },
    });
    return response.data;
};

export const createPaymentInAPI = async (id, paymentData) => {  
    const token = JSON.parse(sessionStorage.getItem("user")).token; // Get token from sessionStorage
    if (!token) {
        throw new Error("User is not authenticated. Please log in.");
    }

    const response = await axios.post(`https://localhost/api/customers/${id}/payments`,
        paymentData, 
        {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};
