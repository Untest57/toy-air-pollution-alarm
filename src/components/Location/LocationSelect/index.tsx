import React, { useCallback, useEffect, useInsertionEffect, useRef, useState } from 'react';
import * as S from './style';
import { LocationOption } from './style';

interface Props {
  locationList: string[];
  defaultValue?: string;
  onChange: (location: string) => void;
}

const defaultProps = {
  disabled: false,
};

const LocationSelect = (props: Props & typeof defaultProps) => {
  const { disabled, locationList, defaultValue, onChange } = props;
  const onSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <>
      <S.LocationSelect onChange={onSelectChange} defaultValue={defaultValue} disabled={disabled}>
        {locationList.map((data, idx) => (
          <S.LocationOption key={data} value={data}>
            {data}
          </S.LocationOption>
        ))}
      </S.LocationSelect>
    </>
  );
};

LocationSelect.defaultProps = defaultProps;

export default LocationSelect;
