import './App.css';
// import Header from './Components/Header/Header';
import Header from './Components/Common/Header/Header';
import './Components/Common/Header/Header.css';
import Main from './Components/Main/Main';
import MapPage from './Components/MapPage/MapPage';
import Profile from './Components/Profile/Profile';
import { Route, Routes } from 'react-router-dom';
import Register from './Components/Register/Register';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from './store';
import { useEffect } from 'react';
import { getProfile } from './api/auth';

// import './App.css';

function App() {
  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(getProfile());
  // }, [dispatch]);
  return (
    <>
      <Header />
      <h1>Hello</h1>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
