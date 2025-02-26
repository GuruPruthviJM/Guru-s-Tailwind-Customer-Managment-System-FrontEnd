import updateEmployeeService from "../../../Modules/AdminModule/service/updateEmployeeService";
import {
  FETCH_UPDATE_EMPLOYEE_REQUEST,
  FETCH_UPDATE_EMPLOYEE_SUCCESS,
  FETCH_UPDATE_EMPLOYEE_FAILURE,
} from "./updateEmployeeType";

export const fetchUpdateEmployeeStatus = (id, role, formData) => async (dispatch) => {
  dispatch({ type: FETCH_UPDATE_EMPLOYEE_REQUEST });
  try {
    const response = await updateEmployeeService(id, role, formData);
    dispatch({
      type: FETCH_UPDATE_EMPLOYEE_SUCCESS,
      payload: response,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    dispatch({
      type: FETCH_UPDATE_EMPLOYEE_FAILURE,
      payload: error.message,
    });
  }
};
