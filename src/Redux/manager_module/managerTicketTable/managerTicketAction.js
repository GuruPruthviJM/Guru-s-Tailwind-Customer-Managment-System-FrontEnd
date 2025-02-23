import { FETCH_TICKETS_FAILURE, FETCH_TICKETS_REQUEST, FETCH_TICKETS_SUCCESS } from './managerTicketType';
import { fetchTicketsFromAPI } from '../../../Modules/ManagerModule/services/managerTicketsService';

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


export const fetchTickets = (managerId, ticketStatus) => {
    return async (dispatch) => {
        dispatch(fetchTicketsRequest());
        try {
            const tickets = await fetchTicketsFromAPI(managerId, ticketStatus); 
            dispatch(fetchTicketsSuccess(tickets));
        } catch (error) {
            dispatch(fetchTicketsFailure(error.message || 'Network Error'));
        }
    };
};
