import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

function Register() {
  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form">
          <input className="login__input" placeholder="Email" type="email" name="email" required/>
          <input className="login__input" placeholder="Пароль" type="password" name="password" required/>
          <div className="login__submission-section">
          <button className="login__button">Зарегистрироваться</button>
          <p className="login__subtitle">Уже зарегистрированы? <Link to="/sign-in" className="login__link">Войти</Link></p>
          </div>
      </form>
    </section>
  );
}

export default Register;
