import {
    FETCH_CHART_DATA_REQUEST,
    FETCH_CHART_DATA_SUCCESS,
    FETCH_CHART_DATA_FAILURE,
  } from "./chartTypes";
  
  const initialState = {
    loading: false,
    chartData: null,
    error: "",
  };
  
  const chartReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CHART_DATA_REQUEST:
        return { ...state, loading: true, error: "" };
      case FETCH_CHART_DATA_SUCCESS:
        return { ...state, loading: false, chartData: action.payload, error: "" };
      case FETCH_CHART_DATA_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default chartReducer;
  