import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "./logInTypes";
import { loginService } from "../../../components/services/logInService";

export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (userData) => ({ type: LOGIN_SUCCESS, payload: userData });
export const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const loginUser = (username, password, role) => async (dispatch) => {
  dispatch(loginRequest());

  try {
    const userData = await loginService(username, password, role);
    if (userData) {
      sessionStorage.setItem("user", JSON.stringify(userData));
      dispatch(loginSuccess(userData));
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    console.error("Login error:", error); // Debugging

    const status = error?.response?.status;
    const errorMapping = {
      404: "User is not registered",
      500: "CRT Error: A critical error occurred in the service layer. Please try again later or contact support if the issue persists."
    };

    // Use the mapping if available; otherwise fallback to error response message or a generic message.
    const errorMessage = errorMapping[status] ?? (error?.response?.data?.message || error?.message || "Login failed");

    dispatch(loginFailure(errorMessage));
  }
};

export const logout = () => (dispatch) => {
  sessionStorage.removeItem("user");
  dispatch({ type: LOGOUT });
};
