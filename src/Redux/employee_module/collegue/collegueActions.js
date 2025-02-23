import { fetchCollegueFromAPI } from "../../../Modules/EmployeeModule/services/employeeCollegue";
import {
    FETCH_COLLEGUES_REQUEST,
    FETCH_COLLEGUES_SUCCESS,
    FETCH_COLLEGUES_FAILURE,
  } from "./collegueType";
  
  // Mock API Fetch (replace with real API call)
  export const fetchCollegues = (id) => {
    return async (dispatch) => {
      dispatch({ type: FETCH_COLLEGUES_REQUEST });
      try {
        const collegues = await fetchCollegueFromAPI(id);
        dispatch({ type: FETCH_COLLEGUES_SUCCESS, payload: collegues });
      } catch (error) {
        dispatch({ type: FETCH_COLLEGUES_FAILURE, payload: error.message });
      }
    }
  };
  