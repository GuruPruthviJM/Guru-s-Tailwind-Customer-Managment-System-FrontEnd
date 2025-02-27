import axios from "axios";
import {
  FETCH_TICKETS_REQUEST,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_FAILURE,
  UPDATE_TICKET_STATUS_REQUEST,
  UPDATE_TICKET_STATUS_SUCCESS,
  UPDATE_TICKET_STATUS_FAILURE,
} from "./ticketType";
import { fetchTicketsFromAPI, updateSpecificTicketFromAPI } from '../../../Modules/EmployeeModule/services/employeeTicket';
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

export const fetchTickets = (userName) => {
  return async (dispatch) => {
    dispatch(fetchTicketsRequest());
    try {
      // Replace the URL with your actual endpoint for fetching tickets
      // console.log(userName);
      
      const response = await fetchTicketsFromAPI(userName)
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

// Update Ticket Status Thunk
export const updateTicketStatusRequest = () => ({
  type: UPDATE_TICKET_STATUS_REQUEST,
});

export const updateTicketStatusSuccess = (ticket) => ({
  type: UPDATE_TICKET_STATUS_SUCCESS,
  payload: ticket,
});

export const updateTicketStatusFailure = (error) => ({
  type: UPDATE_TICKET_STATUS_FAILURE,
  payload: error,
});

export const updateTicketStatus = (ticketId, newStatus) => {
  return async (dispatch) => {
    dispatch(updateTicketStatusRequest());
    try {
      // Replace the URL with your actual endpoint for updating ticket status
      const response = await updateSpecificTicketFromAPI(ticketId, newStatus);
      dispatch(updateTicketStatusSuccess(response));
    } catch (error) {
      dispatch(
        updateTicketStatusFailure(
          error.response?.data?.message || "Failed to update ticket status"
        )
      );
    }
  };
};
