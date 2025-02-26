import {
    FETCH_UPDATE_EMPLOYEE_REQUEST,
    FETCH_UPDATE_EMPLOYEE_SUCCESS,
    FETCH_UPDATE_EMPLOYEE_FAILURE,
  } from "./updateEmployeeType";
  
  const initialState = {
    employee: null, // you can adjust this depending on the expected payload
    loading: false,
    error: null,
  };
  
  const updateEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_UPDATE_EMPLOYEE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_UPDATE_EMPLOYEE_SUCCESS:
        return {
          ...state,
          loading: false,
          employee: action.payload,
        };
      case FETCH_UPDATE_EMPLOYEE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default updateEmployeeReducer;
  