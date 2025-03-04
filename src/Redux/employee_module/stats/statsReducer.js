import {
    FETCH_TIME_DATA_REQUEST,
    FETCH_TIME_DATA_SUCCESS,
    FETCH_TIME_DATA_FAILURE,
  } from "./statsType";
  
  const initialState = {
    loading: false,
    timeData: [],
    error: "",
  };
  
  const timeReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TIME_DATA_REQUEST:
        return { ...state, loading: true, error: "" };
      case FETCH_TIME_DATA_SUCCESS:
        return { ...state, loading: false, timeData: action.payload, error: "" };
      case FETCH_TIME_DATA_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default timeReducer;
  