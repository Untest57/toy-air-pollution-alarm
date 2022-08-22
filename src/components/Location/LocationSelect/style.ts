import styled from 'styled-components';

export const LocationSelect = styled.select`
  //appearance: none;
  margin: 0 auto;
  background: none;
  border: ${({ theme }) => theme.palette.text};
  color: ${({ theme }) => theme.palette.text};
`;

export const LocationOption = styled.option``;
