import {fetchEmployeeDetailsFromAPI} from "../../../Modules/EmployeeModule/services/employeeProfile"
import {
  FETCH_EMPLOYEE_DETAILS_REQUEST,
  FETCH_EMPLOYEE_DETAILS_SUCCESS,
  FETCH_EMPLOYEE_DETAILS_FAILURE,
} from "./detailsType";

// Action creators
export const fetchEmployeeDetailsRequest = () => ({
  type: FETCH_EMPLOYEE_DETAILS_REQUEST,
});

export const fetchEmployeeDetailsSuccess = (details) => ({
  type: FETCH_EMPLOYEE_DETAILS_SUCCESS,
  payload: details,
});

export const fetchEmployeeDetailsFailure = (error) => ({
  type: FETCH_EMPLOYEE_DETAILS_FAILURE,
  payload: error,
});

// Thunk to fetch employee details from backend
export const fetchEmployeeDetails = (userName) => {
  return async (dispatch) => {
    dispatch(fetchEmployeeDetailsRequest());
    try {
      // Get token for auth (if needed)
      const employeeDetails = await fetchEmployeeDetailsFromAPI(userName);
      dispatch(fetchEmployeeDetailsSuccess(employeeDetails));
    } catch (error) {
      dispatch(fetchEmployeeDetailsFailure(error.message));
    }
  };
};
