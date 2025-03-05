import { FETCH_TICKETS_TABLE_FAILURE, FETCH_TICKETS_TABLE_REQUEST, FETCH_TICKETS_TABLE_SUCCESS } from './managerTicketType';
import { fetchTicketsFromAPI } from '../../../Modules/ManagerModule/services/managerTicketsService';

export const fetchTicketsRequest = () => ({
    type: FETCH_TICKETS_TABLE_REQUEST,
});

export const fetchTicketsSuccess = (tickets) => ({
    type: FETCH_TICKETS_TABLE_SUCCESS,
    payload: tickets,
});

export const fetchTicketsFailure = (error) => ({
    type: FETCH_TICKETS_TABLE_FAILURE,
    payload: error,
});


export const fetchTickets = (managerId, ticketStatus) => {
    return async (dispatch) => {
        dispatch(fetchTicketsRequest());
        try {
            const tickets = await fetchTicketsFromAPI(managerId, ticketStatus); 
            console.log(tickets);
            
            dispatch(fetchTicketsSuccess(tickets));
        } catch (error) {
            dispatch(fetchTicketsFailure(error.message || 'Network Error'));
        }
    };
};
