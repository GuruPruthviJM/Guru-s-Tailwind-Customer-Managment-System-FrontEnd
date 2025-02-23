import { SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./signInTypes";
import { signUpService } from "../../../components/services/signInService"; // Assume this service exists

export const signUpRequest = () => ({ type: SIGNUP_REQUEST });
export const signUpSuccess = (userData) => ({ type: SIGNUP_SUCCESS, payload: userData });
export const signUpFailure = (error) => ({ type: SIGNUP_FAILURE, payload: error });

// src/redux/auth/signUpActions.js
export const signUpUser = (fullName, username, email, phoneNumber, password) => async (dispatch) => {
    dispatch(signUpRequest());
  
    try {
      const userData = await signUpService(fullName, username, email, phoneNumber, password);
      dispatch(signUpSuccess(userData));
    } catch (error) {
      dispatch(signUpFailure(error.response?.data?.message || "Signup failed"));
    }
  };
  
