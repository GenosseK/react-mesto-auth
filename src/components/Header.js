import React from "react";
import { Link } from "react-router-dom";
import logo from '../images/logo.svg'

function Header({loggedIn, onLoggingOut, userEmail, buttonText, link}) {
    return (
        <header className="header">
            <img src={logo} alt="Место Россия" className="header__logo" />
            <div className="header__container">
                {loggedIn &&
                (<p className="header__email">{userEmail}</p>)}
                <Link className="header__link" to={link} onClick={onLoggingOut}>{buttonText}</Link>
            </div>
        </header>
    );
}

export default Header;