import axios from "axios";
import {
  FETCH_TICKETS_REQUEST,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_FAILURE,
} from "./ticketType";
import { fetchTicketsFromAPI } from '../../../Modules/ManagerModule/services/managerTicket';
// Fetch Tickets Thunk
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

export const fetchTickets = (id, ticketId) => {
  return async (dispatch) => {
    dispatch(fetchTicketsRequest());
    try {
      // Replace the URL with your actual endpoint for fetching tickets
      // console.log(userName);
      
      const response = await fetchTicketsFromAPI(id, ticketId)
      dispatch(fetchTicketsSuccess(response));
    } catch (error) {
      dispatch(
        fetchTicketsFailure(
          error.response?.data?.message || "Failed to fetch tickets"
        )
      );
    }
  };
};