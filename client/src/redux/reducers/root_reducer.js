import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as oidcReducer } from "redux-oidc";
import { reducer as appReducer } from "./app";
import { socketReducer } from './socket_reducer'

export default history =>
    combineReducers({
        router: connectRouter(history),
        oidc: oidcReducer,
        app: appReducer,
        socket: socketReducer
    });
