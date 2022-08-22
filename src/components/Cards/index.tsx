import React from 'react';
import { AirPollutionInfo } from '@/types/AirPollution';
import Card from '@/components/Cards/Card';

interface Props {
  infos: AirPollutionInfo[] | null;
}

const CartList = (props: Props) => {
  const { infos } = props;
  return <>{infos && infos.map((info) => <Card key={info.stationName} info={info} />)}</>;
};

export default CartList;
