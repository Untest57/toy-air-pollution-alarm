export interface AirKoreaAir {
  response: AirKoreaAirResponse;
}
export interface AirPollutionInfo {
  so2Grade: string;
  khaiValue: string;
  so2Value: string;
  coValue: string;
  o3Grade: string;
  pm10Value: string;
  khaiGrade: string;
  pm25Value: string;
  sidoName: string;
  no2Grade: string;
  pm25Grade: string;
  dataTime: string;
  coGrade: string;
  no2Value: string;
  stationName: string;
  pm10Grade: string;
  o3Value: string;
}
export interface AirKoreaAirResponseBody {
  totalCount: number;
  items: AirPollutionInfo[];
  pageNo: number;
  numOfRows: number;
}
export interface AirKoreaAirResponseHeader {
  resultMsg: string;
  resultCode: string;
}
export interface AirKoreaAirResponse {
  header: AirKoreaAirResponseHeader;
  body: AirKoreaAirResponseBody;
}
