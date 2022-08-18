import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux';
import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk)));

export default store;
