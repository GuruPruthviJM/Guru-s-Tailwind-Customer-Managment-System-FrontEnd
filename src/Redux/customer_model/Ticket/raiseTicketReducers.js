import {
    RAISE_TICKET_REQUEST,
    RAISE_TICKET_SUCCESS,
    RAISE_TICKET_FAILURE,
  } from "./raiseTicketType";
  
  const initialState = {
    loading: false,
    ticket: null,
    error: "",
  };
  
  const ticketRaiseReducer = (state = initialState, action) => {
    switch (action.type) {
      case RAISE_TICKET_REQUEST:
        return { ...state, loading: true, error: "" };
      case RAISE_TICKET_SUCCESS:
        return { ...state, loading: false, ticket: action.payload, error: "" };
      case RAISE_TICKET_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default ticketRaiseReducer;
  