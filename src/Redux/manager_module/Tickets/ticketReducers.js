import {
  FETCH_TICKETS_REQUEST,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_FAILURE,
} from "./ticketType";

const initialState = {
  loading: false,
  tickets: null,
  error: "",
};

const ticketManagerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TICKETS_REQUEST:
      return { ...state, loading: true, error: "" };
    case FETCH_TICKETS_SUCCESS:
      console.log(state.tickets.length); 
      return { ...state, loading: false, tickets: action.payload, error: "" };
    case FETCH_TICKETS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default ticketManagerReducer;
