import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { darken } from 'polished';

export const NavLinkContainer = styled.div`
  display: flex;
  position: fixed;
  flex-direction: row;
  flex-wrap: nowrap;
  width: 100%;
  height: ${({ theme }) => theme.common.navHeight};
  bottom: 0;

  box-shadow: 0px -2px 9px 0px ${({ theme }) => theme.palette.navShadow};

  > * {
    flex-shrink: 0;
    flex-grow: 1;
  }
`;

export const NavLinkStyled = styled(NavLink)`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  appearance: none;
  color: ${({ theme }) => theme.palette.text};
  text-decoration: none;

  &.active {
    background-color: ${({ theme }) => theme.paletteAdjust.body};
  }
`;

export const NavLinkContents = styled.div``;
