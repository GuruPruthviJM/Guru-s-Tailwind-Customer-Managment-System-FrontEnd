import {
    UPDATE_CUSTOMER_DETAILS_REQUEST,
    UPDATE_CUSTOMER_DETAILS_SUCCESS,
    UPDATE_CUSTOMER_DETAILS_FAILURE,
    RESET_UPDATE_CUSTOMER_DETAILS,
    // (other types like FETCH_CUSTOMER_DETAILS_*)
  } from "./customerProfileEditTypes";
  import { updateCustomerDetailsFromAPI } from "../../../Modules/CustomerModule/services/customerEditProfileService";
  
  // Action creators for updating
  export const updateCustomerDetailsRequest = () => ({
    type: UPDATE_CUSTOMER_DETAILS_REQUEST,
  });
  
  export const updateCustomerDetailsSuccess = (customerDetails) => ({
    type: UPDATE_CUSTOMER_DETAILS_SUCCESS,
    payload: customerDetails,
  });
  
  export const updateCustomerDetailsFailure = (error) => ({
    type: UPDATE_CUSTOMER_DETAILS_FAILURE,
    payload: error,
  });
  
  // Thunk action to update customer details
  export const updateCustomerDetails = (id, customerData) => {
    return async (dispatch) => {
      dispatch(updateCustomerDetailsRequest());
      try {
        const updatedDetails = await updateCustomerDetailsFromAPI(id, customerData);
        dispatch(updateCustomerDetailsSuccess(updatedDetails));
      } catch (error) {
        dispatch(updateCustomerDetailsFailure("Failed to update customer details"));
      }
    };
  };

  export const resetUpdateCustomerDetails = () => ({
    type: RESET_UPDATE_CUSTOMER_DETAILS,
  });
  