import {
  SETTING_SOCKET,
  SETTING_SOCKET_SUCCESS,
  SETTING_SOCKET_FAIL
} from './types';

export const setSocket = () => dispatch => {
  const socket = new WebSocket(
    `wss://${window._env_.API_HOST}/dashboard`
  );

  dispatch({
    type: SETTING_SOCKET,
    data: socket
  });

  // When data is received
  socket.onmessage = event => {
    const data = JSON.parse(event.data);

    dispatch({
      type: SETTING_SOCKET_SUCCESS,
      data: data
    });
  };

  // A connection could not be made
  socket.onerror = event => {
    dispatch({
      type: SETTING_SOCKET_FAIL,
      data: event
    });
  };
};
