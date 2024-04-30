import React from 'react';
import { Link } from "react-router-dom";
// import Tariffs from '../Tariffs/Tariffs';

function Header() : React.ReactElement {
    return (
      <>
       <header>
          <nav>
            <ul className="headerNav">
              <li className="headerNavItem">
                <img className="headerlogo" src="#" alt="kids-helper"/>
              </li> 
              <li className="headerNavItem">
                <Link className="headerNavLink" to="/">Главная</Link>
              </li>
              <li className="headerNavItem">
                <Link className="headerNavLink" to="/profile">Личный кабинет</Link>
              </li>
              <li className="headerNavItem">
                <Link className="headerNavLink" to="/map">Карта</Link>
              </li>
              <li className="headerNavItem">
                <Link className="headerNavLink" to="/register">Регистрация</Link>
              </li>
            </ul>
          </nav>
        </header>
      </>
    );
}

export default Header;
 
