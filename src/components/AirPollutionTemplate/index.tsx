import React from 'react';
import LocationSelectGroup from '@/components/Location/LocationSelectGroup';
import { AirPollutionInfo } from '@/types/AirPollution';
import * as S from './style';

interface Props {
  locationLists: string[][];
  values: string[];
  disabledList: boolean[];
  onChange: (location: string, idx: number) => void;
  loading: boolean;
  error: null | Error;
  infos: AirPollutionInfo[] | null;
}

const AirPollutionTemplate = (props: Props) => {
  const { locationLists, values, disabledList, onChange, loading, error, infos } = props;
  return (
    <S.AirPollutionTemplate>
      <LocationSelectGroup
        locationLists={locationLists}
        values={values}
        disabledList={disabledList}
        onChange={onChange}
      ></LocationSelectGroup>
      {loading ? (
        <p>로딩중</p>
      ) : error || !infos ? (
        <p>에러 {error?.message}</p>
      ) : (
        infos && infos.map((info) => <p key={info.stationName}>{info.stationName}</p>)
      )}
    </S.AirPollutionTemplate>
  );
};

export default AirPollutionTemplate;
