import {
  UPDATE_CUSTOMER_DETAILS_REQUEST,
  UPDATE_CUSTOMER_DETAILS_SUCCESS,
  UPDATE_CUSTOMER_DETAILS_FAILURE,
  RESET_UPDATE_CUSTOMER_DETAILS,
} from "./resetTypes";

const initialState = {
  loading: false,
  error: "",
  customerDetails: {},  
  updateSuccess: false,
};

const customerProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CUSTOMER_DETAILS_REQUEST:
      return { ...state, loading: true, error: "", updateSuccess: false };

    case UPDATE_CUSTOMER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        customerDetails: action.payload,
        error: "",
        updateSuccess: true,
      };

    case UPDATE_CUSTOMER_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.payload, updateSuccess: false };

    case RESET_UPDATE_CUSTOMER_DETAILS:
      return { ...state, updateSuccess: false };

    default:
      return state;
  }
};

export default customerProfileReducer;
