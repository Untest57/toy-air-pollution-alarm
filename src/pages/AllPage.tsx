import React, { useCallback, useEffect, useState } from 'react';
import LocationSelect from '../components/Location/LocationSelect';
import { SIDO_NAMES } from '../constants/sidoNames';
import { AirPollutionInfo } from '../types/AirPollution';
import useAsyncRun from '../hooks/useAsyncRun';
import { getCtprvnRltmMesureDnsty } from '../api';

const locationList = SIDO_NAMES;
const defaultValue = SIDO_NAMES[0];

const AllPage = () => {
  const { loading, data: infos, error, runAsync } = useAsyncRun<AirPollutionInfo[]>();
  const [location, setLocation] = useState(defaultValue);

  const fetch = (location: string) => {
    runAsync(async () => {
      const data = await getCtprvnRltmMesureDnsty({
        pageNo: 1,
        sidoName: location,
      });
      return data.response.body.items;
    });
  };

  useEffect(() => {
    fetch(location);
  }, [location]);

  const onChange = useCallback((location: string) => {
    setLocation(() => location);
  }, []);

  return (
    <>
      <LocationSelect locationList={locationList} defaultValue={defaultValue} onChange={onChange}></LocationSelect>
      {loading ? (
        <p>로딩중</p>
      ) : error ? (
        <p>에러 {error?.message}</p>
      ) : (
        infos && infos.map((info) => <p key={info.stationName}>{info.stationName}</p>)
      )}
    </>
  );
};

export default AllPage;
