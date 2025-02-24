import axios from "axios";

export const requestOtpFromAPI = async (data) => {
  try{
    const response = await axios.post(
      "https://localhost:7000/api/customers/validateTheOTP",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }catch(error){
    console.log("guru", error.response.message.data);
    throw new Error(error.response.message.data);
  }
};

export const requestOtpForreset = async (data) => {
  try{
    const response = await axios.post(
      `https://localhost:7000/api/${data.roles}/generateOTP`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }catch(error){
    throw new Error(error.response.message.data);
  }
};

export const verifyOtpFromAPI = async (data) => {
    console.log("guru",data);
  try{
    const response = await axios.post(
      "https://localhost:7000/api/customers/verifyOTP",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }catch(error){
    throw new Error(error.response.message.data);
  }
};
