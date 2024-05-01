import './App.css';
import Header from './Components/Common/Header/Header';
import Footer from './Components/Common/Footer/Footer';
import './Components/Common/Header/Header.css';
import Main from './Components/Main/Main';
import MapPage from './Components/MapPage/MapPage';
import Profile from './Components/Profile/Profile';
import Login from './Components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import { Register } from './Components/Register/Register';



function App() {
  return (
    <>
      <Header />
      <h1>Hello</h1>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
