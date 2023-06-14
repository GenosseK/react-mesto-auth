import React, { useEffect, useContext, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from 'react-hook-form';
import { validateUrl } from "./FormValidator";

function EditAvatar(props) {
  const { isOpen, onClose, onUpdateAvatar, isLoading, onOverlayClick } = props;

  const inputAvatar = useRef();
  const currentUser = useContext(CurrentUserContext);

  const { register, formState: { errors, isValid }, reset, setValue } = useForm();

  useEffect(() => {
    inputAvatar.current.value = ''
  }, [currentUser]);

  useEffect(() => {
    reset();
    setValue("userAvatar", "", { shouldValidate: false });
  }, [isOpen, reset, setValue]);

  const handleAvatarChange = (value) => {
    setValue("userAvatar", value, { shouldValidate: true });
  };

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
      onOverlayClick={onOverlayClick}
      isFormValid={isValid}
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
          {...register("userAvatar", {
            validate: validateUrl,
          })}
          ref={inputAvatar}
          onChange={(e) => handleAvatarChange(e.target.value)}
        />
        {errors.userAvatar && (
          <span className="popup__input-error popup__input-error_visible link-avatar-input-error">
            {errors.userAvatar.message}
          </span>
        )}
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatar;
