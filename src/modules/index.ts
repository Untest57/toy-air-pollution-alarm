import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import pageUIState, { UI_STATE_ROOT_STATE_NAME, UIStateType } from './pageUIState';

const rootReducer = combineReducers({
  [UI_STATE_ROOT_STATE_NAME]: pageUIState,
});

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk)));

export default store;

export type RootState = {
  [key in typeof UI_STATE_ROOT_STATE_NAME]: UIStateType;
};
