import React, { forwardRef, InputHTMLAttributes } from 'react';
import * as S from './style';

type Props = Exclude<InputHTMLAttributes<HTMLInputElement>, 'type'>;

const CheckBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
  return <S.CheckBox ref={ref} type="checkbox" {...props}></S.CheckBox>;
});

CheckBox.displayName = 'CheckBox-InputWrapped';

export default CheckBox;
