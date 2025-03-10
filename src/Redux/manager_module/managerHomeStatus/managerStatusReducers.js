import { 
  FETCH_TICKETS_MANAGER_STATUS_REQUEST, 
  FETCH_TICKETS_MANAGER_STATUS_SUCCESS, 
  FETCH_TICKETS_MANAGER_STATUS_FAILURE 
} from "./managerStatusType";

const initialState = {
  open: 0,
  inProgress: 0,
  closed: 0,
  loading: false,
  error: null,
};

const managerStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TICKETS_MANAGER_STATUS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_TICKETS_MANAGER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        open: action.payload.OPEN,
        inProgress: action.payload.PENDING,
        closed: action.payload.CLOSED
      };
    case FETCH_TICKETS_MANAGER_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default managerStatusReducer;
