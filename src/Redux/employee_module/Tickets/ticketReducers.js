import {
    FETCH_TICKETS_REQUEST,
    FETCH_TICKETS_SUCCESS,
    FETCH_TICKETS_FAILURE,
  } from "./ticketType";
  
  const initialState = {
    loading: false,
    tickets: [],
    error: "",
  };
  
  const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TICKETS_REQUEST:
        return { ...state, loading: true, error: "" };
      case FETCH_TICKETS_SUCCESS:
        return { ...state, loading: false, tickets: action.payload };
      case FETCH_TICKETS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default ticketReducer;
  