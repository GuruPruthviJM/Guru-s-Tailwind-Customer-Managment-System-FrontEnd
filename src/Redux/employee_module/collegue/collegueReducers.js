import {
    FETCH_COLLEGUES_REQUEST,
    FETCH_COLLEGUES_SUCCESS,
    FETCH_COLLEGUES_FAILURE,
  } from "./collegueType";
  
  const initialState = {
    collegues: [],
    loading: false,
    error: null,
  };
  
  const collegueReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_COLLEGUES_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_COLLEGUES_SUCCESS:
        return { ...state, loading: false, collegues: action.payload };
      case FETCH_COLLEGUES_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default collegueReducer;
  