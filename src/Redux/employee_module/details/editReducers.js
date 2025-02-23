import {
    UPDATE_EMPLOYEE_DETAILS_REQUEST,
    UPDATE_EMPLOYEE_DETAILS_SUCCESS,
    UPDATE_EMPLOYEE_DETAILS_FAILURE,
    RESET_UPDATE_EMPLOYEE_DETAILS,
  } from "./editType";
  
  const initialState = {
    loading: false,
    error: "",
    employeeDetails: {},
    updateSuccess: false,
  };
  
  const employeeProfileReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_EMPLOYEE_DETAILS_REQUEST:
        return { ...state, loading: true, error: "", updateSuccess: false };
  
      case UPDATE_EMPLOYEE_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          employeeDetails: action.payload,
          error: "",
          updateSuccess: true,
        };
  
      case UPDATE_EMPLOYEE_DETAILS_FAILURE:
        return { ...state, loading: false, error: action.payload, updateSuccess: false };
  
      case RESET_UPDATE_EMPLOYEE_DETAILS:
        return { ...state, updateSuccess: false };
  
      default:
        return state;
    }
  };
  
  export default employeeProfileReducer;
  