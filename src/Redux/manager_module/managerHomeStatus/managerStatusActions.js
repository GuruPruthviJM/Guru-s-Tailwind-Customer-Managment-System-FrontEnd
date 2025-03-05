import getTicketStatus from "../../../Modules/ManagerModule/services/managerStatusService";
import { 
  FETCH_TICKETS_MANAGER_STATUS_REQUEST, 
  FETCH_TICKETS_MANAGER_STATUS_SUCCESS, 
  FETCH_TICKETS_MANAGER_STATUS_FAILURE 
} from "./managerStatusType";

// Async action creator for fetching ticket stats
export const fetchTicketStats = (id) => async (dispatch) => {
  dispatch({ type: FETCH_TICKETS_MANAGER_STATUS_REQUEST });

  try {
    // Fetch ticket data from API
    const response = await getTicketStatus(id);

    // Validate response
    if (!response || typeof response !== "object") {
      throw new Error("Invalid response from server");
    }

    // Extracting and providing default values to prevent null issues
    console.log(response);
    const { OPEN: open = 0, PENDING: inProgress = 0, CLOSED: closed = 0 } = response;
    dispatch({
      type: FETCH_TICKETS_MANAGER_STATUS_SUCCESS,
      payload: response
    });
    console.log(open, inProgress, closed);
  } catch (error) {
    console.error("Error fetching ticket stats:", error);
    dispatch({
      type: FETCH_TICKETS_MANAGER_STATUS_FAILURE,
      payload: error.response?.data?.message || error.message || "Failed to fetch ticket stats",
    });
  }
};
