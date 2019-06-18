import { CALL_API } from './../apiMiddleware';
import { actionTypes } from './../actionTypes';

export const eventLoadActions = actionTypes('EVENT_LOAD');
export const scanAttendeeActions = actionTypes('ATTENDEE_SCAN');
export const getEvents = () => {
  return dispatch => {
    return dispatch({
      [CALL_API]: {
        type: eventLoadActions,
        endpoint: `/api/getMyEvent`,
      },
    });
  };
};

export const doScanAttendee = ({ eventId, attendeId }, onSuccess, onError) => {
  const data = {
    eventId,
    attendeId,
  };
  return async dispatch => {
    const actionResponse = await dispatch({
      [CALL_API]: {
        type: scanAttendeeActions,
        method: 'POST',
        endpoint: `/api/markAttendance`,
        data: JSON.stringify(data),
      },
    });
    if (actionResponse.type === scanAttendeeActions.SUCCESS) {
      onSuccess(actionResponse);
    }
    if (actionResponse.type === scanAttendeeActions.ERROR) {
      onError(actionResponse);
    }
    return actionResponse;
  };
};
