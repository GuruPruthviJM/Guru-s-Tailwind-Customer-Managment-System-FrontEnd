import {
    FETCH_CUSTOMER_DETAILS_REQUEST,
    FETCH_CUSTOMER_DETAILS_SUCCESS,
    FETCH_CUSTOMER_DETAILS_FAILURE,
  } from './customerProfileTypes';
  
  const initialState = {
    loading: false,
    error: '',
    customerDetails: [],
  };
  
  const customerDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CUSTOMER_DETAILS_REQUEST:
        return { ...state, loading: true, error: '' };
      case FETCH_CUSTOMER_DETAILS_SUCCESS:
        return { ...state, loading: false, customerDetails: action.payload, error: '' };
      case FETCH_CUSTOMER_DETAILS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default customerDetailsReducer;
  