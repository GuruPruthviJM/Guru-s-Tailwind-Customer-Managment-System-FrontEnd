import {
    FETCH_MANAGER_DETAILS_FAILURE,
    FETCH_MANAGER_DETAILS_REQUEST,
    FETCH_MANAGER_DETAILS_SUCCESS
  } from "./detailsType";
  
  const initialState = {
    loading: false,
    employeeDetails: {},
    error: "",
  };
  
  const managerDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_MANAGER_DETAILS_REQUEST:
        return { ...state, loading: true, error: "" };
      case FETCH_MANAGER_DETAILS_SUCCESS:
        return { ...state, loading: false, employeeDetails: action.payload };
      case FETCH_MANAGER_DETAILS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default managerDetailsReducer;
  