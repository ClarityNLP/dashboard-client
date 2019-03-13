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
    socket.onmessage = function(event) {
        console.log(JSON.parse(event.data));
        dispatch({
            type: SETTING_SOCKET_SUCCESS,
            data: JSON.parse(event.data)
        });
    };

    // A connection could not be made
    socket.onerror = function(event) {
        dispatch({
            type: SETTING_SOCKET_FAIL,
            data: JSON.parse(event.data)
        });
    };
};
