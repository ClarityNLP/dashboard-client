export function receiveStats() {
  return dispatch => {
    const receiveStats = update => {
      return dispatch({
        type: 'RECEIVE_STATS',
        data: update
      });
    };

    return dispatch({
      type: 'socket',
      types: [null, null, null],
      promise: socket => socket.on('stats', receiveStats)
    });
  };
}
