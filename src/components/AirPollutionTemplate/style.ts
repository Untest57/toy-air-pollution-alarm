import styled from 'styled-components';

export const AirPollutionTemplate = styled.div`
  width: ${({ theme }) => theme.common.innerWidth};
  margin: 0 auto;
  padding-bottom: ${({ theme }) => theme.common.navHeight};
`;

export const AirPollutionSelectContainer = styled.div`
  position: fixed;
  width: ${({ theme }) => theme.common.selectHeight};
  top: 0;
`;
