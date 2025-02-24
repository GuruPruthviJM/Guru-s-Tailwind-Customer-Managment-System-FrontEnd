import {
  OTP_REQUEST,
  OTP_REQUEST_SUCCESS,
  OTP_REQUEST_FAILURE,
  OTP_VERIFY_REQUEST,
  OTP_VERIFY_SUCCESS,
  OTP_VERIFY_FAILURE,
  OTP_RESET,
} from "./otpType";

const initialState = {
  // For OTP request
  requestLoading: false,
  requestData: null,
  requestError: "",
  // For OTP verification
  verifyLoading: false,
  verified: false,
  verifyError: "",
};

const otpReducer = (state = initialState, action) => {
  switch (action.type) {
    // OTP Request Cases
    case OTP_REQUEST:
      return { ...state, requestLoading: true, requestError: "" };
    case OTP_REQUEST_SUCCESS:
      return { ...state, requestLoading: false, requestData: action.payload, requestError: "" };
    case OTP_REQUEST_FAILURE:
      return { ...state, requestLoading: false, requestError: action.payload };

    // OTP Verification Cases
    case OTP_VERIFY_REQUEST:
      return { ...state, verifyLoading: true, verified: false, verifyError: "" };
    case OTP_VERIFY_SUCCESS:
      return { ...state, verifyLoading: false, verified: true, verifyError: "" };
    case OTP_VERIFY_FAILURE:
      return { ...state, verifyLoading: false, verified: false, verifyError: action.payload };

    // Reset OTP verification flag
    case OTP_RESET:
      return { ...state, verified: false };

    default:
      return state;
  }
};

export default otpReducer;
