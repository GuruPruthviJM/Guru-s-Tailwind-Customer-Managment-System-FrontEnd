// src/redux/ticket/ticketReducer.js

import { FETCH_TICKETS_TABLE_FAILURE, FETCH_TICKETS_TABLE_REQUEST, FETCH_TICKETS_TABLE_SUCCESS } from './managerTicketType';

const initialState = {
    loading: false,
    tickets: [],
    error: '',
};

const ticketManagerTableReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TICKETS_TABLE_REQUEST:
            return { ...state, loading: true };
        case FETCH_TICKETS_TABLE_SUCCESS:
            return { ...state, loading: false, tickets: action.payload, error: '' };
        case FETCH_TICKETS_TABLE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default ticketManagerTableReducer;
