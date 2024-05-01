import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Login from '../Components/Login/Login';
import Register from '../Components/RegisterForm/Register';

export const router = createBrowserRouter([
  { path: '/', element: <App /> },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);
