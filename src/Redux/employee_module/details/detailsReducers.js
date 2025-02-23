import {
    FETCH_EMPLOYEE_DETAILS_REQUEST,
    FETCH_EMPLOYEE_DETAILS_SUCCESS,
    FETCH_EMPLOYEE_DETAILS_FAILURE,
  } from "./detailsType";
  
  const initialState = {
    loading: false,
    employeeDetails: {},
    error: "",
  };
  
  const employeeDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_EMPLOYEE_DETAILS_REQUEST:
        return { ...state, loading: true, error: "" };
      case FETCH_EMPLOYEE_DETAILS_SUCCESS:
        return { ...state, loading: false, employeeDetails: action.payload };
      case FETCH_EMPLOYEE_DETAILS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default employeeDetailsReducer;
  