import React from 'react';
import LocationSelect from '../components/Location/LocationSelect';
import { SIDO_NAMES } from '../constants/sidoNames';

const locationList = SIDO_NAMES;
const defaultValue = SIDO_NAMES[0];

const LocationPage = () => {
  const onChange = (location: string) => {};

  return <LocationSelect locationList={locationList} defaultValue={defaultValue} onChange={onChange}></LocationSelect>;
};

export default LocationPage;
