import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfile({ onClose, isOpen, onUpdateUser, isLoading }) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('')

  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
  }, [currentUser, isOpen]);


  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name="profile-edit"
      formName="profileEdit"
      title="Редактировать профиль"
      submitButtonLabel="Сохранить"
      sumbitBtnLoading="Сохранение..."
      isLoading={isLoading}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input"
        id="name"
        name="userName"
        required
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        autoComplete="off"
        value={name ?? ""}
        onChange={(evt) => setName(evt.target.value)}
      />
      <span className="popup__input-error name-error"></span>
      <input
        type="text"
        className="popup__input"
        id="description"
        name="userDescription"
        required
        placeholder="Описание"
        minLength="2"
        maxLength="40"
        autoComplete="off"
        value={description ?? ""}
        onChange={(evt) => setDescription(evt.target.value)}
      />
      <span className="popup__input-error description-error"></span>
    </PopupWithForm>
  );
}

export default EditProfile;
