import { applyMiddleware, compose, createStore } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers/root_reducer';

// MIDDLEWARES
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import socketMiddleware from '../middleware/socketMiddleware';
import createSagaMiddleware from 'redux-saga';
import { redirectToOIDCSaga } from '../../auth/sagas';

const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();
const axiosMiddlewareOptions = {
  interceptors: {
    request: [
      (state, config) => {
        if (state.getState().oidc.user) {
          config.headers['Authorization'] =
            'Bearer ' + state.getState().oidc.user.access_token;
        }
        return config;
      }
    ]
  }
};

export default function configureStore(
  initialState,
  socketClient,
  apiClient,
  history
) {
  const store = createStore(
    createRootReducer(history),
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history),
        thunk,
        socketMiddleware(socketClient),
        axiosMiddleware(apiClient, axiosMiddlewareOptions),
        logger
      )
    )
  );

  sagaMiddleware.run(redirectToOIDCSaga);

  return store;
}
