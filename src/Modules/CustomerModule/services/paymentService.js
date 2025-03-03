import axios from 'axios';

export const fetchPaymentsFromAPI = async (id) => {
    const token = JSON.parse(sessionStorage.getItem("user")).token; // Get token from sessionStorage
    

    if (!token) {
        throw new Error("User is not authenticated. Please log in.");
    }

    const response = await axios.get(`http://18.209.26.169:8080/api/customers/${id}/payments`, {
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

    const response = await axios.post(`http://18.209.26.169:8080/api/customers/${id}/payments`,
        paymentData, 
        {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};
