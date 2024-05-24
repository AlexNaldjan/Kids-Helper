import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../../store/auth/actionCreators';
import { RootState, useAppDispatch } from '../../../store/';
import { useCookies } from 'react-cookie';
import './Header.css';

function Header(): React.ReactElement {
  const [, setCookie] = useCookies(['refreshToken']);
  const [isFixed, setIsFixed] = useState(false);

  const isLoggedIn = useSelector(
    (state: RootState) => !!state.auth.authData.accessToken,
  );
  const dispatch = useAppDispatch();
  function logoutHandler() {
    setCookie('refreshToken', '', {
      path: '/',
      maxAge: 0,
    });
    dispatch(logoutUser());
  }

  useEffect(() => {
    const handleScroll = () => {
      const shouldBeFixed = window.scrollY > 80;
      setIsFixed(shouldBeFixed);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header className="upper-header">
        <img
          className="upper-header-logo"
          src="/src/Components/Common/Header/logo_no_background.svg"
        />
      </header>
      <header
        className={`lower-header-container ${isFixed ? 'fixed-header' : ''}`}
      >
        <header className="lower-header">
          {' '}
          <div className="headerNavItem" id="tel">
            <Link to="/chat" id="map-link" className="headerNavLink">
              Где спросить?
            </Link>
          </div>
          <nav>
            <ul className="headerNav">
              <div className="nav">
                {!isLoggedIn ? (
                  <>
                    <Link to="/login" id="enter-link" className="headerNavLink">
                      Вход
                    </Link>
                    <Link
                      to="/register"
                      id="register-link"
                      className="headerNavLink"
                    >
                      Регистрация
                    </Link>

                    <Link id="main-link" className="headerNavLink" to="/">
                      Главная
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="headerNav">
                      <ul className="nav">
                        <li className="headerNavItem">
                          <button
                            onClick={logoutHandler}
                            className="headerNavLink quit-btn"
                            id="header-quit-btn"
                          >
                            Выход
                          </button>
                        </li>
                        <li className="headerNavItem">
                          <Link
                            id="profile-link"
                            className="headerNavLink"
                            to="/profile"
                          >
                            Профиль
                          </Link>
                        </li>
                        <li className="headerNavItem">
                          <Link
                            id="map-link"
                            className="headerNavLink"
                            to="/map"
                          >
                            Где поискать?
                          </Link>
                        </li>
                        <li className="headerNavItem">
                          <Link id="main-link" className="headerNavLink" to="/">
                            Что поискать?
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </ul>
          </nav>
        </header>
      </header>
    </>
  );
}

export default Header;
