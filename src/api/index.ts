import axios from 'axios';
import { AirKoreaAir } from '../types/AirPollution';
import { fetchFake } from '../constants/data';
import { TYPE_SIDO_NAMES } from '../constants/sidoNames';

const server = axios.create({
  baseURL: 'B552584/ArpltnInforInqireSvc',
  params: {
    returnType: 'json',
    numOfRows: '100',
    ver: '1.0',
    serviceKey: 'CPXs3Bni5mrdcj09gMCbIx2ogKtyjzy33cC3AHti02sdWh9pnAunstY16eCrivyqvOWVNlec7Wzb3SIclp0Dlg==',
  },
});

export async function getCtprvnRltmMesureDnsty(
  { sidoName, pageNo }: { sidoName: string; pageNo: number },
  signal?: AbortSignal,
) {
  // const response = await server.get<AirKoreaAir>('getCtprvnRltmMesureDnsty', {
  //   params: {
  //     sidoName,
  //     pageNo,
  //   },
  //   signal: signal,
  // });
  // const data = response.data;

  const data = await fetchFake({ sidoName, pageNo }, signal);

  // 에러가 꼭 json 형태로 내려주지 않는다.....
  const resultCode = data?.response?.header?.resultCode;
  const error = resultCode === undefined || Number(resultCode) !== 0;

  if (error) {
    throw new Error(`서버 error / resultCode: ${resultCode}`);
  }

  if (data.response.body.totalCount === 0) {
    throw new Error(`잘못된 요청으로 빈 값 반환`);
  }

  return data;
}
