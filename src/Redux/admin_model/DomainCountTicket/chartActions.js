import {
  FETCH_CHART_DATA_REQUEST,
  FETCH_CHART_DATA_SUCCESS,
  FETCH_CHART_DATA_FAILURE,
} from "./chartTypes";
import { fetchChartDataFromAPI } from "../../../Modules/AdminModule/service/chartService";

export const fetchChartDataRequest = () => ({
  type: FETCH_CHART_DATA_REQUEST,
});

export const fetchChartDataSuccess = (chartData) => ({
  type: FETCH_CHART_DATA_SUCCESS,
  payload: chartData,
});

export const fetchChartDataFailure = (error) => ({
  type: FETCH_CHART_DATA_FAILURE,
  payload: error,
});

export const fetchChartData = () => {
  return async (dispatch) => {
    dispatch(fetchChartDataRequest());
    try {
      const data = await fetchChartDataFromAPI();
      dispatch(fetchChartDataSuccess(data));
    } catch (error) {
      dispatch(
        fetchChartDataFailure(
          error.response?.data?.message || "Failed to fetch chart data"
        )
      );
    }
  };
};
