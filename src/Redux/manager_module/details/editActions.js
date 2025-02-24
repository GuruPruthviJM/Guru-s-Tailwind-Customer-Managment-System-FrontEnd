import {
    UPDATE_MANAGER_DETAILS_REQUEST,
    UPDATE_MANAGER_DETAILS_SUCCESS,
    UPDATE_MANAGER_DETAILS_FAILURE,
    RESET_UPDATE_MANAGER_DETAILS,
  } from "./editType";
  import { updateManagerDetailsFromAPI } from "../../../Modules/ManagerModule/services/managerEditProfileService";
  
  // Action creators for updating
  export const updateManagerDetailsRequest = () => ({
    type: UPDATE_MANAGER_DETAILS_REQUEST,
  });
  
  export const updateManagerDetailsSuccess = (managerDetails) => ({
    type: UPDATE_MANAGER_DETAILS_SUCCESS,
    payload: managerDetails,
  });
  
  export const updateManagerDetailsFailure = (error) => ({
    type: UPDATE_MANAGER_DETAILS_FAILURE,
    payload: error,
  });
  
  // Thunk action to update employee details
  export const updateManagerDetails = (id, employeeData) => {
    return async (dispatch) => {
      dispatch(updateManagerDetailsRequest());
      try {
        const updatedDetails = await updateManagerDetailsFromAPI(id, employeeData);
        dispatch(updateManagerDetailsSuccess(updatedDetails));
      } catch (error) {
        dispatch(updateManagerDetailsFailure("Failed to update employee details"));
      }
    };
  };
  
  export const resetUpdateManagerDetails = () => ({
    type: RESET_UPDATE_MANAGER_DETAILS,
  });
  