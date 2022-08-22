import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    margin: 0 0;
    background: ${({ theme }) => theme.palette.body};
    color: ${({ theme }) => theme.palette.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
  ${({ theme }) => theme.globalCss}
  
  #root {
    position: relative;
    height: 100vh;
    margin: 0 0;
  }
`;

export default GlobalStyle;
