import {
    FETCH_TICKETS_COUNT_REQUEST,
    FETCH_TICKETS_COUNT_SUCCESS,
    FETCH_TICKETS_COUNT_FAILURE,
  } from "./outageTypes";
  
  const initialState = {
    loading: false,
    ticketsCount: [],
    error: "",
  };
  
  const outageReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TICKETS_COUNT_REQUEST:
        return { ...state, loading: true, error: "" };
      case FETCH_TICKETS_COUNT_SUCCESS:
        return { ...state, loading: false, ticketsCount: action.payload, error: "" };
      case FETCH_TICKETS_COUNT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default outageReducer;
  