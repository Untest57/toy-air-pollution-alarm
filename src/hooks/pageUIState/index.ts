import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/modules';
import {
  actionsCreators,
  UI_STATE_ROOT_STATE_NAME,
  UIStateKeyType,
} from '@/modules/pageUIState';

export const useUIState = <KEY extends UIStateKeyType>(pageName: KEY) => {
  const state = useSelector((state: RootState) => {
    return state[UI_STATE_ROOT_STATE_NAME][pageName];
  });

  const dispatch = useDispatch();
  const actions = useMemo(() => {
    const target = actionsCreators[pageName];
    const ret = Object.fromEntries(
      Object.entries(target).map(([key, actionsCreator]) => {
        return [key, bindActionCreators(actionsCreator, dispatch)];
      }),
    ) as typeof target;

    return ret;
  }, [dispatch]);
  return { state, actions };
};
