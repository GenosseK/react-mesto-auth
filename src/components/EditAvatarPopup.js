import React, { useEffect, useContext, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatar(props) {
  const { isOpen, onClose, onUpdateAvatar, isLoading } = props;

  const inputAvatar = useRef();
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    inputAvatar.current.value = ''
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputAvatar.current.value,
    })
  }

  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      submitButtonLabel="Сохранить"
      sumbitBtnLoading="Сохранение..."
      isLoading={isLoading}
      formName="changeAvatar"
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          type="url"
          className="popup__input"
          id="link-avatar-input"
          name="userAvatar"
          required
          placeholder="Ссылка на картинку"
          autoComplete="off"
          ref={inputAvatar}
        />
        <span className="popup__input-error link-avatar-input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatar;
