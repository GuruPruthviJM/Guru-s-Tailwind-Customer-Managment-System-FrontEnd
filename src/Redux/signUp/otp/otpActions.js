import {
    OTP_REQUEST,
    OTP_REQUEST_SUCCESS,
    OTP_REQUEST_FAILURE,
    OTP_VERIFY_REQUEST,
    OTP_VERIFY_SUCCESS,
    OTP_VERIFY_FAILURE,
    OTP_RESET,
  } from "./otpType";
import { requestOtpFromAPI, verifyOtpFromAPI, requestOtpForreset } from "../../../components/services/otpService";
  
export const otpRequest = () => ({
   type: OTP_REQUEST,
});
  
  export const otpSuccess = (data) => ({
    type: OTP_REQUEST_SUCCESS,
    payload: data,
  });
  
  export const otpFailure = (error) => ({
    type: OTP_REQUEST_FAILURE,
    payload: error,
  });
  
  // Action Creators for OTP Verification
  export const otpVerifyRequest = () => ({
    type: OTP_VERIFY_REQUEST,
  });
  
  export const otpVerifySuccess = (data) => ({
    type: OTP_VERIFY_SUCCESS,
    payload: data,
  });
  
  export const otpVerifyFailure = (error) => ({
    type: OTP_VERIFY_FAILURE,
    payload: error,
  });
  
  export const resetOtp = () => ({ 
    type: OTP_RESET 
  });

  // Thunk action to request OTP using the service layer
  export const requestOtp = (userData) => {
    return async (dispatch) => {
      dispatch(otpRequest());
      try {
        const data = await requestOtpFromAPI(userData);
        dispatch(otpSuccess(data));
      } catch (error) {
        dispatch(
          otpFailure(
            error.response?.data?.message || "OTP request failed. Please try again."
          )
        );
      }
    };
  };

  export const requestOtpForReset = (userData) => {
    return async (dispatch) => {
      dispatch(otpRequest());
      try {
        const data = await requestOtpForreset(userData);
        dispatch(otpSuccess(data));
      } catch (error) {
        dispatch(
          otpFailure(
            error.response?.data?.message || "OTP request failed. Please try again."
          )
        );
      }
    };
  };
  
  // Thunk action to verify OTP using the service layer
  export const verifyOtp = (email, otp) => {
    return async (dispatch) => {  
      dispatch(otpVerifyRequest());
      try {
        console.log(email, otp);
        
        const data = await verifyOtpFromAPI({email, otp});
        dispatch(otpVerifySuccess(data));
      } catch (error) {
        dispatch(
          otpVerifyFailure(
            error.response?.data?.message || "OTP verification failed. Please try again."
          )
        );
      }
    };
  };
  