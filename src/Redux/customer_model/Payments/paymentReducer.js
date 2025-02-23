import { 
    FETCH_PAYMENTS_REQUEST, FETCH_PAYMENTS_SUCCESS, FETCH_PAYMENTS_FAILURE,
    CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS, CREATE_PAYMENT_FAILURE 
} from './paymentTypes';

const initialState = {
    loading: false,
    payments: [],
    error: '',
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PAYMENTS_REQUEST:
        case CREATE_PAYMENT_REQUEST:
            return { ...state, loading: true };

        case FETCH_PAYMENTS_SUCCESS:
            return { ...state, loading: false, payments: action.payload, error: '' };

        case CREATE_PAYMENT_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                payments: [...state.payments, action.payload], 
                error: '' 
            };

        case FETCH_PAYMENTS_FAILURE:
        case CREATE_PAYMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default paymentReducer;
