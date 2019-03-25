import React from "react";
import ReactDOM from "react-dom";
import "./styles/style.scss";
import axios from "axios";
import { loadUser } from "redux-oidc";
import userManager from "./auth/userManager";
import configureStore from "./redux/store/store";
import { createBrowserHistory } from "history";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

serviceWorker.register();

const history = createBrowserHistory();

const initialState = {};

const apiClient = axios.create({
    baseURL: `http://${window._env_.REACT_APP_API_HOST}`,
    responseType: "text"
});

const store = configureStore(initialState, apiClient, history);

loadUser(store, userManager);

ReactDOM.render(
    <App store={store} history={history} />,
    document.getElementById("root")
);
