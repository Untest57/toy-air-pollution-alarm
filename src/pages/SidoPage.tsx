import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import AirPollutionTemplate from '@/components/AirPollutionTemplate';
import useAsyncRun from '@/hooks/useAsyncRun';
import { useUIState } from '@/hooks/pageUIState';
import { getCtprvnRltmMesureDnsty } from '@/api';
import { SIDO_NAMES } from '@/constants/sidoNames';
import { AirPollutionInfo } from '@/types/AirPollution';

const sidoNames = SIDO_NAMES;
const defaultSido = SIDO_NAMES[0];

const SidoPage = () => {
  const { loading, data: infos, error, runAsync, abort } = useAsyncRun<AirPollutionInfo[]>();

  const { state: uiState, actions: uiActions } = useUIState('Sido');

  const fetch = (location: string) => {
    if (loading) {
      abort();
    }
    runAsync(async (signal) => {
      const data = await getCtprvnRltmMesureDnsty(
        {
          pageNo: 1,
          sidoName: location,
        },
        signal,
      );
      return data.response.body.items;
    });
  };

  const dispatch = useDispatch();

  const onChange = useCallback(
    (location: string, idx: number) => {
      fetch(location);
      uiActions.updateUIStatePageSidoInSidoSelect(location);
    },
    [fetch, uiActions],
  );

  useEffect(() => {
    fetch(uiState.sidoSelect ?? defaultSido);
  }, []);

  return (
    <AirPollutionTemplate
      locationLists={[sidoNames]}
      values={[uiState.sidoSelect]}
      disabledList={[false]}
      onChange={onChange}
      loading={loading}
      error={error}
      infos={infos}
    />
  );
};

export default SidoPage;
