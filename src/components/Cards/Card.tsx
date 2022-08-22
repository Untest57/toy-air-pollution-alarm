import React from 'react';
import { AirPollutionInfo } from '@/types/AirPollution';

interface Props {
  info: AirPollutionInfo;
}

const Card = (props: Props) => {
  const { info } = props;
  return <p>{info.stationName}</p>;
};

export default Card;
