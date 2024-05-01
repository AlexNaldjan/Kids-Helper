import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Components/Common/Header/Header';
import './Components/Common/Header/Header.css';
import Main from './Components/Main/Main';
import MapPage from './Components/MapPage/MapPage';
import Profile from './Components/Profile/Profile';
import { Route, Routes } from 'react-router-dom';
import { RegisterForm } from './Components/RegisterForm/RegisterForm';

// import './App.css';

function App(): JSX.Element {
  return (
    <>
      <Header />
      <h1>Hello</h1>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </>
  );
}

export default App;
