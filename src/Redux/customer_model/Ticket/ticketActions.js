import { FETCH_TICKETS_FAILURE, FETCH_TICKETS_REQUEST, FETCH_TICKETS_SUCCESS } from './ticketTypes';
import { fetchTicketsFromAPI } from '../../../Modules/CustomerModule/services/ticketService';

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


export const fetchTickets = (customerId) => {
    return async (dispatch) => {
        dispatch(fetchTicketsRequest());
        try {
            const tickets = await fetchTicketsFromAPI(customerId); // Pass customerId
            dispatch(fetchTicketsSuccess(tickets));
        } catch (error) {
            dispatch(fetchTicketsFailure(error.message || 'Network Error'));
        }
    };
};
