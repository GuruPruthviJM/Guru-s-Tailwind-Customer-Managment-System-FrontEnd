import {
    FETCH_TICKETS_COUNT_REQUEST,
    FETCH_TICKETS_COUNT_SUCCESS,
    FETCH_TICKETS_COUNT_FAILURE,
  } from "./outageTypes";
  import { fetchTicketsCountFromAPI } from "../../../Modules/AdminModule/service/outageService";
  
  export const fetchTicketsCountRequest = () => ({
    type: FETCH_TICKETS_COUNT_REQUEST,
  });
  
  export const fetchTicketsCountSuccess = (ticketsCount) => ({
    type: FETCH_TICKETS_COUNT_SUCCESS,
    payload: ticketsCount,
  });
  
  export const fetchTicketsCountFailure = (error) => ({
    type: FETCH_TICKETS_COUNT_FAILURE,
    payload: error,
  });
  
  // Thunk action to fetch tickets count from the backend via the service layer
  export const fetchTicketsCount = () => {
    return async (dispatch) => {
      dispatch(fetchTicketsCountRequest());
      try {
        const data = await fetchTicketsCountFromAPI();
        dispatch(fetchTicketsCountSuccess(data));
      } catch (error) {
        dispatch(
          fetchTicketsCountFailure(
            error.response?.data?.message || "Failed to fetch tickets count"
          )
        );
      }
    };
  };
  