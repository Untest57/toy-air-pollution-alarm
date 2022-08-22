import React from 'react';
import * as S from './style';
import LocationSelect from '../LocationSelect';

type Props = {
  locationLists: string[][];
  values: string[];
  disabledList: boolean[];
  onChange: (location: string, idx: number) => void;
};

const defaultProps = {};

const LocationSelectGroup = (props: Props & typeof defaultProps) => {
  const { disabledList, locationLists, values, onChange } = props;

  const onChangeWrapped = (idx: number) => (location: string) => {
    onChange(location, idx);
  };

  return (
    <S.LocationSelectGroup>
      {locationLists.map((locationList, idx) => (
        <LocationSelect
          key={idx}
          locationList={locationList}
          value={values?.[idx] ?? undefined}
          onChange={onChangeWrapped(idx)}
          disabled={disabledList?.[idx] ?? false}
        />
      ))}
    </S.LocationSelectGroup>
  );
};

LocationSelectGroup.defaultProps = defaultProps;

export default LocationSelectGroup;
