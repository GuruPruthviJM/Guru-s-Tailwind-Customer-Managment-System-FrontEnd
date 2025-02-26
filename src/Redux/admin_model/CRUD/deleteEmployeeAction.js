import deleteEmployeeService from "../../../Modules/AdminModule/service/deleteEmployeeService";
import {
  FETCH_DELETE_EMPLOYEE_STATUS_REQUEST,
  FETCH_DELETE_EMPLOYEE_STATUS_SUCCESS,
  FETCH_DELETE_EMPLOYEE_STATUS_FAILURE,
} from "./deleteEmployeeType";

export const fetchDeleteEmployeeStatus = (employeeId, role, reason) => async (dispatch) => {
  dispatch({ type: FETCH_DELETE_EMPLOYEE_STATUS_REQUEST });
  try {
    const response = await deleteEmployeeService(employeeId, role, reason);
    dispatch({
      type: FETCH_DELETE_EMPLOYEE_STATUS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    dispatch({
      type: FETCH_DELETE_EMPLOYEE_STATUS_FAILURE,
      payload: error.message,
    });
  }
};
