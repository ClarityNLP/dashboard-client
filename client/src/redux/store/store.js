import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers/root_reducer';
// MIDDLEWARES
import thunk from 'redux-thunk';
import { multiClientMiddleware } from 'redux-axios-middleware';
import { createLogger } from 'redux-logger';
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

export default function configureStore(initialState, apiClient, history) {
  const store = createStore(
    createRootReducer(history),
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history),
        thunk,
        multiClientMiddleware(apiClient, axiosMiddlewareOptions),
        logger
      )
    )
  );

  sagaMiddleware.run(redirectToOIDCSaga);

  return store;
}
