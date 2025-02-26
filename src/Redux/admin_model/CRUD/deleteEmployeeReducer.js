import {
    FETCH_DELETE_EMPLOYEE_STATUS_REQUEST,
    FETCH_DELETE_EMPLOYEE_STATUS_SUCCESS,
    FETCH_DELETE_EMPLOYEE_STATUS_FAILURE,
  } from "./deleteEmployeeType";
  
  const initialState = {
    employee: null, // you can adjust this depending on the expected payload
    loading: false,
    error: null,
  };
  
  const deleteEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DELETE_EMPLOYEE_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_DELETE_EMPLOYEE_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          employee: action.payload,
        };
      case FETCH_DELETE_EMPLOYEE_STATUS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default deleteEmployeeReducer;
  