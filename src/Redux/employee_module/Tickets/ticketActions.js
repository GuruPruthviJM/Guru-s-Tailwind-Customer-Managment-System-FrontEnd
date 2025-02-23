import axios from "axios";
import {
  FETCH_TICKETS_REQUEST,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_FAILURE,
} from "./ticketType";

import {fetchTicketsFromAPI} from '../../../Modules/EmployeeModule/services/employeeTicket'

// Action Creators
export const fetchTicketsRequest = () => ({
  type: FETCH_TICKETS_REQUEST,
});

export const fetchTicketsSuccess = (tickets) => ({
  type: FETCH_TICKETS_SUCCESS,
  payload: tickets,
});

export const fetchTicketsFailure = (error) => ({
  type: FETCH_TICKETS_FAILURE,
  payload: error,
});

// Thunk Action to Fetch Tickets from the Backend
export const fetchTickets = (id) => {
  return async (dispatch) => {
    dispatch(fetchTicketsRequest());
    try {
      const tickets = await fetchTicketsFromAPI(id);
      dispatch(fetchTicketsSuccess(tickets));
    } catch (error) {
      dispatch(fetchTicketsFailure(error.message));
    }
  };
};
