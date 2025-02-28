import {
    EMPLOYEE_FETCH_REQUEST,
    EMPLOYEE_FETCH_SUCCESS,
    EMPLOYEE_FETCH_FAIL,
  } from './readEmployeeType';
  
  const initialState = {
    employees: [],
  };
  
  const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
      case EMPLOYEE_FETCH_REQUEST:
        return { loading: true, employees: [] };
      case EMPLOYEE_FETCH_SUCCESS:
        return { loading: false, employees: action.payload };
      case EMPLOYEE_FETCH_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export default employeeReducer;