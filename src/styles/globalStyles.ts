import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    background: ${({ theme }) => theme.palette.body};
    color: ${({ theme }) => theme.palette.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
`;
