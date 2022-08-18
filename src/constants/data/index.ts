// noinspection NonAsciiCharacters

import 서울 from './서울.json';
import 부산 from './부산.json';
import 대구 from './대구.json';
import 인천 from './인천.json';
import 광주 from './광주.json';
import 대전 from './대전.json';
import 울산 from './울산.json';
import 경기 from './경기';
import 강원 from './강원.json';
import 충북 from './충북.json';
import 충남 from './충남.json';
import 전북 from './전북.json';
import 전남 from './전남.json';
import 경북 from './경북.json';
import 경남 from './경남.json';
import 제주 from './제주.json';
import 세종 from './세종.json';

import { AirKoreaAir } from '../../types/AirPollution';
import { NO_PAGE } from './noPage';

export const RAW_DATA = {
  서울,
  부산,
  대구,
  인천,
  광주,
  대전,
  울산,
  경기,
  강원,
  충북,
  충남,
  전북,
  전남,
  경북,
  경남,
  제주,
  세종,
} as { [key: string | symbol]: AirKoreaAir | AirKoreaAir[] };

export const fetchFake = (location: keyof typeof RAW_DATA, pageNo: number) => {
  console.log('WARN Using fetchFake');
  return new Promise<AirKoreaAir>((resolve, reject) => {
    setTimeout(() => {
      if (!Object.hasOwn(RAW_DATA, location)) {
        resolve(NO_PAGE(pageNo));
        return;
      }
      if (Math.random() < 0.05) {
        reject(new Error('Fake Error'));
        return;
      }

      const data = RAW_DATA[location];

      if (Array.isArray(data)) {
        if (data.length <= pageNo - 1) {
          resolve(NO_PAGE(pageNo));
          return;
        }
        resolve(data[pageNo - 1]);
        return;
      }

      resolve(data);
    }, 1500 + Math.round(Math.random() * 1000.0));
  });
};
