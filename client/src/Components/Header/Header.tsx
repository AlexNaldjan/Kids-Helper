import { NavLink } from 'react-router-dom';
import './header.css';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../store/auth/actionCreators';
import { useAppDispatch } from '../../store';

function Header(): React.ReactElement {
  const isLoggedIn = useSelector((state) => !!state.auth.authData.accessToken);
  const dispatch = useAppDispatch();

  function logoutHandler() {
    dispatch(logoutUser());
  }

  return (
    <div className="header">
      <div className="nav">
        {!isLoggedIn ? (
          <>
            <NavLink to="/login" className="nav-item">
              <button className="btn btn-login">Вход</button>
            </NavLink>
            <NavLink to="/register" className="nav-item">
              <button className="btn btn-register">Регистрация</button>
            </NavLink>
          </>
        ) : (
          <>
            <button onClick={logoutHandler} className="btn btn-logout">
              Выход
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
