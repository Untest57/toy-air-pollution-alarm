import React, { useCallback } from 'react';
import * as S from './style';

interface Props {
  locationList: string[];
  value?: string;
  onChange: (location: string) => void;
}

const defaultProps = {
  disabled: false,
};

const LocationSelect = (props: Props & typeof defaultProps) => {
  const { disabled, locationList, value, onChange } = props;
  const onSelectChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <>
      <S.LocationSelect onChange={onSelectChange} value={value} disabled={disabled}>
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
