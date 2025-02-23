import {
    UPDATE_EMPLOYEE_DETAILS_REQUEST,
    UPDATE_EMPLOYEE_DETAILS_SUCCESS,
    UPDATE_EMPLOYEE_DETAILS_FAILURE,
    RESET_UPDATE_EMPLOYEE_DETAILS,
  } from "./editType";
  import { updateEmployeeDetailsFromAPI } from "../../../Modules/EmployeeModule/services/employeeEditProfile";
  
  // Action creators for updating
  export const updateEmployeeDetailsRequest = () => ({
    type: UPDATE_EMPLOYEE_DETAILS_REQUEST,
  });
  
  export const updateEmployeeDetailsSuccess = (employeeDetails) => ({
    type: UPDATE_EMPLOYEE_DETAILS_SUCCESS,
    payload: employeeDetails,
  });
  
  export const updateEmployeeDetailsFailure = (error) => ({
    type: UPDATE_EMPLOYEE_DETAILS_FAILURE,
    payload: error,
  });
  
  // Thunk action to update employee details
  export const updateEmployeeDetails = (id, employeeData) => {
    return async (dispatch) => {
      dispatch(updateEmployeeDetailsRequest());
      try {
        const updatedDetails = await updateEmployeeDetailsFromAPI(id, employeeData);
        dispatch(updateEmployeeDetailsSuccess(updatedDetails));
      } catch (error) {
        dispatch(updateEmployeeDetailsFailure("Failed to update employee details"));
      }
    };
  };
  
  export const resetUpdateEmployeeDetails = () => ({
    type: RESET_UPDATE_EMPLOYEE_DETAILS,
  });
  