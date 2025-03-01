// employeeActions.js
import axios from 'axios';
import {
  EMPLOYEE_FETCH_REQUEST,
  EMPLOYEE_FETCH_SUCCESS,
  EMPLOYEE_FETCH_FAIL,
} from './readEmployeeType';

export const fetchEmployees = () => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_FETCH_REQUEST });
    const { data } = await axios.get('/api/employees');
    dispatch({ type: EMPLOYEE_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
