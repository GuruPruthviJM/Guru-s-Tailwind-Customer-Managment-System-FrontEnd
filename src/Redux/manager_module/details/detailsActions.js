import {fetchManagerDetailsFromAPI} from "../../../Modules/ManagerModule/services/managerProfileService"
import {
    FETCH_MANAGER_DETAILS_REQUEST,
    FETCH_MANAGER_DETAILS_SUCCESS,
    FETCH_MANAGER_DETAILS_FAILURE,
} from "./detailsType";

// Action creators
export const fetchEmployeeDetailsRequest = () => ({
  type: FETCH_MANAGER_DETAILS_REQUEST,
});

export const fetchEmployeeDetailsSuccess = (details) => ({
  type: FETCH_MANAGER_DETAILS_SUCCESS,
  payload: details,
});

export const fetchEmployeeDetailsFailure = (error) => ({
  type: FETCH_MANAGER_DETAILS_FAILURE,
  payload: error,
});

// Thunk to fetch employee details from backend
export const fetchEmployeeDetails = (userName) => {
  return async (dispatch) => {
    dispatch(fetchEmployeeDetailsRequest());
    try {
      const employeeDetails = await fetchManagerDetailsFromAPI(userName);
      dispatch(fetchEmployeeDetailsSuccess(employeeDetails));
    } catch (error) {
      dispatch(fetchEmployeeDetailsFailure(error.message));
    }
  };
};
