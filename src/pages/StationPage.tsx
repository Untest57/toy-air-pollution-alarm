import React, { useCallback, useEffect, useState } from 'react';
import AirPollutionTemplate from '@/components/AirPollutionTemplate';
import useAsyncRun from '@/hooks/useAsyncRun';
import { useUIState } from '@/hooks/pageUIState';
import { SIDO_NAMES } from '@/constants/sidoNames';
import { AirPollutionInfo } from '@/types/AirPollution';
import { getCtprvnRltmMesureDnsty } from '@/api';

const sidoNames = SIDO_NAMES;
const defaultSido = SIDO_NAMES[0];

const SidoStationPage = () => {
  const { loading, data: infos, error, runAsync, abort } = useAsyncRun<AirPollutionInfo[]>();

  const { state: uiState, actions: uiActions } = useUIState('Station');

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

  const onChange = useCallback(
    (location: string, idx: number) => {
      if (idx === 0) {
        fetch(location);
        uiActions.updateUIStatePageStationInSidoSelect(location);
      } else {
        uiActions.updateUIStatePageStationInStationSelect({
          ...uiState.stationSelect,
          [uiState.sidoSelect]: location,
        });
      }
    },
    [fetch],
  );

  useEffect(() => {
    fetch(uiState.sidoSelect ?? defaultSido);
  }, []);

  return (
    <AirPollutionTemplate
      locationLists={[sidoNames, infos?.map((info) => info.stationName) ?? []]}
      values={[uiState.sidoSelect, uiState.stationSelect[uiState.sidoSelect]]}
      disabledList={[false, false]}
      onChange={onChange}
      loading={loading}
      error={error}
      infos={infos?.filter((info) => info.stationName === uiState.stationSelect[uiState.sidoSelect]) ?? []}
    />
  );
};

export default SidoStationPage;
