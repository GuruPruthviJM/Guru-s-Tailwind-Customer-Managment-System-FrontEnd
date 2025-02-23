import getTicketStatus from "../../../Modules/ManagerModule/services/managerStatusService";
import { FETCH_TICKETS_STATUS_REQUEST, FETCH_TICKETS_STATUS_SUCCESS, FETCH_TICKETS_STATUS_FAILURE } from "./managerStatusType";

export const fetchTicketStats = (id) => async (dispatch) => {
  dispatch({ type: FETCH_TICKETS_STATUS_REQUEST });
  try {
    const { OPEN: open, PENDING: inProgress, CLOSED: closed } = await getTicketStatus(id);
    dispatch({
      type: FETCH_TICKETS_STATUS_SUCCESS,
      payload: { open, inProgress, closed },
    });
  } catch (error) {
    console.error("Error fetching ticket stats:", error);   
    dispatch({
      type: FETCH_TICKETS_STATUS_FAILURE,
      payload: error.message,
    });
  }
};
