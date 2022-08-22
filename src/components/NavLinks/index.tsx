import React, { MouseEvent, MouseEventHandler, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useUIState } from '@/hooks/pageUIState';
import DarkModeSwitch from '@/components/DarkModeSwitch';
import * as S from './style';

interface Props {}

const NavLinks = (props: Props) => {
  const { actions } = useUIState('Main');

  const onClick = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    actions.updateUIStatePageMainInLastPage(event.currentTarget.pathname);
  }, []);

  return (
    <S.NavLinkContainer>
      <S.NavLinkStyled to="/station" onClick={onClick}>
        내 지역보기
      </S.NavLinkStyled>
      <S.NavLinkStyled to="/sido" onClick={onClick}>
        전체 시도보기
      </S.NavLinkStyled>
      <S.NavLinkStyled to="/favorite" onClick={onClick}>
        즐겨찾기
      </S.NavLinkStyled>
      <DarkModeSwitch style={{ flexGrow: 0, flexShrink: 0 }} />
    </S.NavLinkContainer>
  );
};

export default NavLinks;
