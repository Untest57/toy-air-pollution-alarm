const _SIDO_NAMES = [
  '서울',
  '부산',
  '대구',
  '인천',
  '광주',
  '대전',
  '울산',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
  '세종',
] as const;

export const SIDO_NAMES = _SIDO_NAMES as unknown as string[];

export type TYPE_SIDO_NAMES = typeof SIDO_NAMES[number];
