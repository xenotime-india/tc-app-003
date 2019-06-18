import { actionTypes } from './../actionTypes';

export const eventLoadActions = actionTypes('EVENT_LOAD');
export const scanAttendeeActions = actionTypes('ATTENDEE_SCAN');

const initialState = {
  data: [],
  scan: [],
  scanAttendeeLoading: false,
  scanAttendeeError: false,
  eventsLoading: true,
  eventsError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case eventLoadActions.BEGIN: {
      return { ...state, eventsLoading: true, eventsError: false };
    }
    case eventLoadActions.ERROR: {
      return { ...state, eventsLoading: false, eventsError: true };
    }
    case eventLoadActions.SUCCESS: {
      return {
        ...state,
        data: [...action.response],
        eventsLoading: false,
        eventsError: false,
      };
    }
    case scanAttendeeActions.BEGIN: {
      return { ...state, scanAttendeeLoading: true, scanAttendeeError: false };
    }
    case scanAttendeeActions.ERROR: {
      return { ...state, scanAttendeeLoading: false, scanAttendeeError: true };
    }
    case scanAttendeeActions.SUCCESS: {
      return {
        ...state,
        scan: [...state.scan, action.response.attendeeId],
        scanAttendeeLoading: false,
        scanAttendeeError: false,
      };
    }
    default:
      return state;
  }
};
