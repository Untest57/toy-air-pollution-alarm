import React from 'react';
import * as S from './style';
import LocationSelect from '../LocationSelect';

type Props = {
  locationLists: string[][];
  defaultValues: string[];
  onChange: (location: string, idx: number) => void;
};

const defaultProps = {
  disabled: false,
};

const LocationSelectGroup = (props: Props & typeof defaultProps) => {
  const { disabled, locationLists, defaultValues, onChange } = props;

  const onChangeWrapped = (idx: number) => (location: string) => {
    onChange(location, idx);
  };

  return (
    <S.LocationSelectGroup>
      {locationLists.map((locationList, idx) => (
        <LocationSelect
          key={idx}
          locationList={locationList}
          defaultValue={defaultValues[idx] ?? undefined}
          onChange={onChangeWrapped(idx)}
          disabled={disabled}
        />
      ))}
    </S.LocationSelectGroup>
  );
};

LocationSelectGroup.defaultProps = defaultProps;

export default LocationSelectGroup;
