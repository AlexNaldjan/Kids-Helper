import './App.css';
import './Components/Common/Header/Header.css';
import Header from './Components/Common/Header/Header';
import Footer from './Components/Common/Footer/Footer';
import Main from './Components/Main/Main';
import MapPage from './Components/MapPage/MapPage';
import Profile from './Components/Profile/Profile';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';

import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const isLoggedIn = useSelector(state => !!state.auth.authData.accessToken);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/map"
          element={isLoggedIn ? <MapPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
