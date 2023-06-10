import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import AuthForm from "./AuthForm";

function Register({onRegister, passwordInput, emailInput, handleChangeInput}) {

  return (
    <AuthForm 
    title="Регистрация"
    buttonText="Зарегистрироваться"
    loginLink={true}
    handleChangeInput={handleChangeInput}
    handleSubmitForm={onRegister}
    passwordInput={passwordInput}
    emailInput={emailInput}
    />
  );
}

export default Register;
