import styled from 'styled-components';

export const CardList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;
export const Card = styled.div`
  &.bad {
    background-color: ${({ theme }) => theme.palette.red};
  }
  &.good {
    background-color: ${({ theme }) => theme.palette.blue};
  }
  &.normal {
    background-color: ${({ theme }) => theme.palette.green};
  }
`;
