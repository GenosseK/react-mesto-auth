import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.svg'

function Header(props) {
    return (
        <header className="header">
            <img src={logo} alt="Место Россия" className="header__logo" />
            <div className="header__container">
                <p className="header__email">akazhanov72@yandex.ru</p>
                <Link className="header__link" to="/somepage">Выйти</Link>
            </div>
        </header>
    );
}

export default Header;