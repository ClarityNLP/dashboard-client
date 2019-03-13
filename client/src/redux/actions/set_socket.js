import {
    SETTING_SOCKET,
    SETTING_SOCKET_SUCCESS,
    SETTING_SOCKET_FAIL
} from "./types";

export const setSocket = () => dispatch => {
    dispatch({
        type: SETTING_SOCKET
    });

    // Open a connection
    var socket = new WebSocket(process.env.REACT_APP_SOCKET_SERVER);

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