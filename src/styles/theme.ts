const lightPalette = {
  red: '#FF595E',
  yellow: '#FFCA3A',
  green: '#8AC926',
  blue: '#1982C4',
  purple: '#6A4C93',

  body: '#ffffff',
  text: '#000000',
};

const darkPalette = {
  red: '#F95A5D',
  yellow: '#FDA354',
  green: '#8C9D43',
  blue: '#1C93B7',
  purple: '#695E86',

  body: '#333333',
  text: '#AAAAAA',
};

const common = {};

const fontSizes = {};

export const lightTheme = {
  common,
  palette: lightPalette,
  fontSizes,
};

export const darkTheme = {
  common,
  palette: darkPalette,
  fontSizes,
};

export type ThemeType = typeof lightTheme & typeof darkTheme;
