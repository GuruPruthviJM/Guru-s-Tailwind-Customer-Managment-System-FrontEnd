import {
    FETCH_TIME_DATA_REQUEST,
    FETCH_TIME_DATA_SUCCESS,
    FETCH_TIME_DATA_FAILURE,
  } from "./statsType";
  import { fetchTimeDataFromAPI } from "../../../Modules/EmployeeModule/services/employeeStats";
  
  export const fetchTimeDataRequest = () => ({
    type: FETCH_TIME_DATA_REQUEST,
  });
  
  export const fetchTimeDataSuccess = (timeData) => ({
    type: FETCH_TIME_DATA_SUCCESS,
    payload: timeData,
  });
  
  export const fetchTimeDataFailure = (error) => ({
    type: FETCH_TIME_DATA_FAILURE,
    payload: error,
  });
  
  export const fetchTimeData = () => {
    return async (dispatch) => {
      dispatch(fetchTimeDataRequest());
      try {
        const data = await fetchTimeDataFromAPI();
        dispatch(fetchTimeDataSuccess(data));
      } catch (error) {
        dispatch(
          fetchTimeDataFailure(
            error.response?.data?.message || "Failed to fetch time data"
          )
        );
      }
    };
  };
  