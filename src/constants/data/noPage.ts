export const NO_PAGE = (idx: number) => ({
  response: {
    body: {
      totalCount: 125,
      items: [],
      pageNo: idx,
      numOfRows: 100,
    },
    header: {
      resultMsg: 'NORMAL_CODE',
      resultCode: '00',
    },
  },
});
