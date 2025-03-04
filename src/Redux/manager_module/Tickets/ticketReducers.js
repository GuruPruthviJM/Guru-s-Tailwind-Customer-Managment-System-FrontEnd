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
      console.log(state.tickets.length); 
      return { ...state, loading: false, tickets: action.payload, error: "" };
    case FETCH_TICKETS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_TICKET_STATUS_REQUEST:
      return { ...state, loading: true, error: "" };
    case UPDATE_TICKET_STATUS_SUCCESS:
      // Update the ticket in the tickets array
      return {
        ...state,
        loading: false,
        tickets: state.tickets.map((ticket) =>
          ticket.ticketId === action.payload.ticketId ? action.payload : ticket
        ),
        error: "",
      };
    case UPDATE_TICKET_STATUS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default ticketReducer;
