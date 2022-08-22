import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUIState } from '@/hooks/pageUIState';

interface Props {
  defaultPath: string;
}

const MainPage = (props: Props) => {
  const { defaultPath } = props;
  const { state } = useUIState('Main');

  return <Navigate to={state.lastPage || defaultPath} replace={true}></Navigate>;
};

export default MainPage;
