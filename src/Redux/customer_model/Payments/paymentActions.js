import {
    FETCH_PAYMENTS_REQUEST, FETCH_PAYMENTS_SUCCESS, FETCH_PAYMENTS_FAILURE,
    CREATE_PAYMENT_REQUEST, CREATE_PAYMENT_SUCCESS, CREATE_PAYMENT_FAILURE
} from './paymentTypes';

import { fetchPaymentsFromAPI, createPaymentInAPI } from '../../../Modules/CustomerModule/services/paymentService';

// Fetch Payments
export const fetchPaymentsRequest = () => ({ type: FETCH_PAYMENTS_REQUEST });
export const fetchPaymentsSuccess = (payments) => ({ type: FETCH_PAYMENTS_SUCCESS, payload: payments });
export const fetchPaymentsFailure = (error) => ({ type: FETCH_PAYMENTS_FAILURE, payload: error });

export const fetchPayments = (id) => async (dispatch) => {
    dispatch(fetchPaymentsRequest());
    try {
        const payments = await fetchPaymentsFromAPI(id);
        dispatch(fetchPaymentsSuccess(payments));
    } catch (error) {
        dispatch(fetchPaymentsFailure(error.message || 'Failed to fetch payments'));
    }
};

// Create Payment
export const createPaymentRequest = () => ({ type: CREATE_PAYMENT_REQUEST });
export const createPaymentSuccess = (payment) => ({ type: CREATE_PAYMENT_SUCCESS, payload: payment });
export const createPaymentFailure = (error) => ({ type: CREATE_PAYMENT_FAILURE, payload: error });

export const createPayment = (id,paymentData) => async (dispatch) => {
    dispatch(createPaymentRequest());
    try {
        const payment = await createPaymentInAPI(id, paymentData);
        dispatch(createPaymentSuccess(payment));
    } catch (error) {
        dispatch(createPaymentFailure(error.message || 'Payment failed'));
    }
};
