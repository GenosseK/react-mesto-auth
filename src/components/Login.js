import React from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Login({onLogin, passwordInput, emailInput, handleChangeInput}) {
  return (
    <AuthForm 
    title="Вход"
    buttonText="Войти"
    loginLink={false}
    handleChangeInput={handleChangeInput}
    handleSubmitForm={onLogin}
    passwordInput={passwordInput}
    emailInput={emailInput}
    />
  );
}

export default Login;
