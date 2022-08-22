import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DarkModeProvider from './context/DarkModeProvider';
import GlobalStyle from './styles/globalStyles';
import { darkTheme, lightTheme } from './styles/theme';
import store from './modules';
import StationPage from './pages/StationPage';
import SidoPage from './pages/SidoPage';
import FavoritePage from './pages/FavoritePage';
import MainPage from '@/pages/MainPage';
import NavLinks from '@/components/NavLinks';

function App() {
  return (
    <DarkModeProvider light={lightTheme} dark={darkTheme}>
      <GlobalStyle />
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage defaultPath="/sido" />}></Route>
            <Route path="/station" element={<StationPage />}></Route>
            <Route path="/sido" element={<SidoPage />}></Route>
            <Route path="/favorite" element={<FavoritePage />}></Route>
          </Routes>
          <NavLinks />
        </BrowserRouter>
      </Provider>
    </DarkModeProvider>
  );
}

export default App;
