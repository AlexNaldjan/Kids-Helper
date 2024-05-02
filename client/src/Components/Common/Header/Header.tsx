import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../../store/auth/actionCreators';
import { useAppDispatch } from '../../../store/';

function Header(): React.ReactElement {
  const isLoggedIn = useSelector(state => !!state.auth.authData.accessToken);
  const dispatch = useAppDispatch();

  function logoutHandler() {
    dispatch(logoutUser());
  }

  return (
    <>
      <header>
        <nav>
          <ul className="headerNav">
            <li className="headerNavItem">
              <img className="headerlogo" src="#" alt="kids-helper" />
            </li>
            <li className="headerNavItem">
              <Link className="headerNavLink" to="/">
                Главная
              </Link>
            </li>
            <div className="nav">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="headerNavLink">
                    Вход
                  </Link>
                  <Link to="/register" className="headerNavLink">
                    Регистрация
                  </Link>
                </>
              ) : (
                <>
                  <div className="nav">
                    <ul className="headerNav">
                      <li className="headerNavItem">
                        <Link className="headerNavLink" to="/profile">
                          Личный кабинет
                        </Link>
                      </li>
                      <li className="headerNavItem">
                        <Link className="headerNavLink" to="/map">
                          Карта
                        </Link>
                      </li>
                      <li className="headerNavItem">
                        <button
                          onClick={logoutHandler}
                          className="headerNavLink quit-btn"
                        >
                          Выход
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
