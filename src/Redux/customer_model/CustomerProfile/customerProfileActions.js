import {
  FETCH_CUSTOMER_DETAILS_REQUEST,
  FETCH_CUSTOMER_DETAILS_SUCCESS,
  FETCH_CUSTOMER_DETAILS_FAILURE,
} from './customerProfileTypes';
import { fetchCustomerDetailsFromAPI } from '../../../Modules/CustomerModule/services/customerProfileService';

// Action to start fetching customer details
export const fetchCustomerDetailsRequest = () => ({
  type: FETCH_CUSTOMER_DETAILS_REQUEST,
});

// Action for a successful fetch of customer details
export const fetchCustomerDetailsSuccess = (customerDetails) => ({
  type: FETCH_CUSTOMER_DETAILS_SUCCESS,
  payload: customerDetails,
});

// Action for a failed fetch of customer details
export const fetchCustomerDetailsFailure = (error) => ({
  type: FETCH_CUSTOMER_DETAILS_FAILURE,
  payload: error,
});

// Thunk action to fetch customer details asynchronously using the service API
export const fetchCustomerDetails = (id) => {
  return async (dispatch) => {
    dispatch(fetchCustomerDetailsRequest());
    try {
      const customerDetails = await fetchCustomerDetailsFromAPI(id);
      dispatch(fetchCustomerDetailsSuccess(customerDetails));
    } catch (error) {
      dispatch(fetchCustomerDetailsFailure('Failed to load customer details'));
    }
  };
};
