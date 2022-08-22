import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';
import { createUIStateDucks } from '@/modules/pageUIState/base';
import { PAGE_NAMES } from '@/constants';

export const UI_STATE_ROOT_STATE_NAME = 'UI_STATE' as const;

const mainDucks = createUIStateDucks(PAGE_NAMES.Main, ['lastPage'], []);
const sidoDucks = createUIStateDucks(PAGE_NAMES.Sido, ['sidoSelect'], []);
const stationDucks = createUIStateDucks(PAGE_NAMES.Station, ['sidoSelect'], ['stationSelect']);

export const pageUIStateKeys = [mainDucks.pageName, sidoDucks.pageName, stationDucks.pageName];

export const actionsCreators = {
  ...mainDucks.actionsCreators,
  ...sidoDucks.actionsCreators,
  ...stationDucks.actionsCreators,
};

const pageUIState = combineReducers({
  ...mainDucks.reducer,
  ...sidoDucks.reducer,
  ...stationDucks.reducer,
});

export default pageUIState;

export type UIStateType = NonNullable<ReturnType<typeof pageUIState>>;
export type UIStateKeyType = typeof pageUIStateKeys[number];

const test = <Keys extends UIStateKeyType>(key: Keys) => {
  return ({} as UIStateType)[key];
};

// state 이름 = page 이름 맵핑
