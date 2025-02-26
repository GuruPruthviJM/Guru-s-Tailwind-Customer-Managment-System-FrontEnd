import {
    FETCH_ADD_EMPLOYEE_STATUS_REQUEST,
    FETCH_ADD_EMPLOYEE_STATUS_SUCCESS,
    FETCH_ADD_EMPLOYEE_STATUS_FAILURE,
  } from "./addEmployeeType";
  
  const initialState = {
    employee: null, // Adjust this based on the expected payload for a new employee
    loading: false,
    error: null,
  };
  
  const addEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ADD_EMPLOYEE_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_ADD_EMPLOYEE_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          employee: action.payload,
        };
      case FETCH_ADD_EMPLOYEE_STATUS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default addEmployeeReducer;
  