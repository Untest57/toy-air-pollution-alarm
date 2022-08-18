import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import DarkModeProvider from './context/DarkModeProvider';
import { darkTheme, lightTheme } from './styles/theme';
import store from './modules';
import LocationPage from './pages/LocationPage';
import AllPage from './pages/AllPage';
import FavoritePage from './pages/FavoritePage';

function App() {
  return (
    <DarkModeProvider light={lightTheme} dark={darkTheme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/location" element={<LocationPage />}></Route>
            <Route path="/all" element={<AllPage />}></Route>
            <Route path="/favorite" element={<FavoritePage />}></Route>
          </Routes>
          <div>
            <NavLink to="/location">내 지역보기</NavLink>
            <NavLink to="/all">전체 시도보기</NavLink>
            <NavLink to="/favorite">즐겨찾기</NavLink>
          </div>
        </BrowserRouter>
      </Provider>
    </DarkModeProvider>
  );
}

export default App;
