import React, { CSSProperties } from 'react';
import { useDarkMode } from '@/context/DarkModeProvider';
import * as S from './style';

interface Props {
  style?: CSSProperties;
  checkBoxStyle?: CSSProperties;
}

const DarkModeSwitch = (props: Props) => {
  const { style, checkBoxStyle } = props;

  const { themeName, setThemeName } = useDarkMode();

  return (
    <div style={style}>
      <S.Checkbox
        id="darkmode-checkbox"
        style={checkBoxStyle}
        onChange={(e) => {
          setThemeName(e.currentTarget.checked ? 'dark' : 'light');
        }}
        checked={themeName === 'dark'}
      />
      <S.Label htmlFor="darkmode-checkbox">다크모드</S.Label>
    </div>
  );
};

export default DarkModeSwitch;
