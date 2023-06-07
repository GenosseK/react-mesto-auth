import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form">
          <input className="login__input" placeholder="Email" type="email" name="email" required/>
          <input className="login__input" placeholder="Пароль" type="password" name="password" required/>
          <div className="login__submission-section">
          <button className="login__button">Войти</button>
          </div>
      </form>
    </section>
  );
}

export default Login;
