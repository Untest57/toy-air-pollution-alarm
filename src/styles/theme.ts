import { css, FlattenSimpleInterpolation, SimpleInterpolation } from 'styled-components';
import { darken, invert, lighten } from 'polished';

const breakpoints = {
  xsmall: '(max-width: 480px)',
  small: '(max-width: 767px)',
  medium: '(max-width: 1024px)',
  large: '(min-width: 1280px)',
};

const globalCss: Array<FlattenSimpleInterpolation> = [];

const getValueWithMediaQuery = <T extends number | string>(
  name: string,
  values: {
    [key in keyof typeof breakpoints]: T;
  },
) => {
  // 다 따로 하지 말고 묶어서 한번에 보내게 만들어야 함
  globalCss.push(css`
    @media screen and ${breakpoints.xsmall} {
      body {
        --${name}: ${values.xsmall}
      }
    };
    @media screen and ${breakpoints.large} {
      body {
        --${name}: ${values.large}
      }
    };
    @media screen and ${breakpoints.medium} {
      body {
        --${name}: ${values.medium}
      }
    } ;
    @media screen and ${breakpoints.small} {
      body {
        --${name}: ${values.small}
      }
    } ;
  `);

  return `var(--${name})`;
};

const lightPalette = {
  red: '#FF595E',
  yellow: '#FFCA3A',
  green: '#8AC926',
  blue: '#1982C4',
  purple: '#6A4C93',

  body: '#ffffff',
  text: '#000000',

  navShadow: '#b2b2b2',
};

const lightPaletteAdjust = {
  body: darken(0.2, lightPalette.body),
};

const darkPalette = {
  red: '#F95A5D',
  yellow: '#FDA354',
  green: '#8C9D43',
  blue: '#1C93B7',
  purple: '#695E86',

  body: '#333333',
  text: '#BBBBBB',

  navShadow: invert('#b2b2b2'),
};

const darkPaletteAdjust = {
  body: lighten(0.07, darkPalette.body),
};

const common = {
  innerWidth: getValueWithMediaQuery('innerWidth', {
    xsmall: '100%',
    small: '100%',
    medium: '900px',
    large: '1100px',
  }),
  navHeight: '84px',
  selectHeight: '84px',
};

const fontSizes = {};

const baseTheme = {
  common,
  fontSizes,
  globalCss: globalCss,
};

export const lightTheme = {
  palette: lightPalette,
  paletteAdjust: lightPaletteAdjust,
  ...baseTheme,
};

export const darkTheme = {
  palette: darkPalette,
  paletteAdjust: darkPaletteAdjust,
  ...baseTheme,
};
export type ThemeType = typeof lightTheme & typeof darkTheme;
