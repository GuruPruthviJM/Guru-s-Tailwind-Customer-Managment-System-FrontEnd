import {
    RAISE_TICKET_REQUEST,
    RAISE_TICKET_SUCCESS,
    RAISE_TICKET_FAILURE,
  } from "./raiseTicketType";
  import { raiseTicketFromAPI } from "../../../Modules/CustomerModule/services/ticketService";
  
  export const raiseTicketRequest = () => ({
    type: RAISE_TICKET_REQUEST,
  });
  
  export const raiseTicketSuccess = (ticket) => ({
    type: RAISE_TICKET_SUCCESS,
    payload: ticket,
  });
  
  export const raiseTicketFailure = (error) => ({
    type: RAISE_TICKET_FAILURE,
    payload: error,
  });
  
  export const raiseTicket = (ticketData) => {
    return async (dispatch) => {
      dispatch(raiseTicketRequest());
      try {
        const data = await raiseTicketFromAPI(ticketData);
        dispatch(raiseTicketSuccess(data));
      } catch (error) {
        dispatch(
          raiseTicketFailure(
            error.response?.data?.message || "Failed to raise ticket. Please try again."
          )
        );
      }
    };
  };
  