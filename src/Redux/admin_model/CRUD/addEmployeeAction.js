import addEmployeeService from "../../../Modules/AdminModule/service/addEmployeeService";
import {
  FETCH_ADD_EMPLOYEE_STATUS_REQUEST,
  FETCH_ADD_EMPLOYEE_STATUS_SUCCESS,
  FETCH_ADD_EMPLOYEE_STATUS_FAILURE,
} from "./addEmployeeType";

export const fetchAddEmployeeStatus = (formData) => async (dispatch) => {
  dispatch({ type: FETCH_ADD_EMPLOYEE_STATUS_REQUEST });
  try {
    const response = await addEmployeeService(formData);
    dispatch({
      type: FETCH_ADD_EMPLOYEE_STATUS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    dispatch({
      type: FETCH_ADD_EMPLOYEE_STATUS_FAILURE,
      payload: error.message,
    });
  }
};
