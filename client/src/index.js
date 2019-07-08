import React from 'react';
import ReactDOM from 'react-dom';
import './styles/style.scss';
import axios from 'axios';
import { loadUser } from 'redux-oidc';
import userManager from './auth/userManager';
import SocketClient from './redux/helpers/SocketClient';
import configureStore from './redux/store/store';
import { createBrowserHistory } from 'history';
import App from './App';
import * as serviceWorker from './serviceWorker';
// serviceWorker.register(); //TODO causing issue on USER_EXPIRED

const history = createBrowserHistory();
const initialState = {};
const socketClient = new SocketClient();
const apiClient = axios.create({
  baseURL: `https://${window._env_.REACT_APP_API_HOST}`,
  responseType: 'text',
  withCredentials: true
});

const store = configureStore(initialState, socketClient, apiClient, history);

loadUser(store, userManager);

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById('root')
);
