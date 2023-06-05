import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddCard({ onClose, isOpen, onAddCard, isLoading }) {

  const [cardName, setCardName] = useState('')
  const [cardLink, setCardLink] = useState('')

  useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen])

  function handleSubmit(e) {
    e.preventDefault();

    onAddCard({
      name: cardName,
      link: cardLink,
    })
  }

  return (
    <PopupWithForm
      name="popup_add-card"
      formName="addCard"
      title="Новое Место"
      submitButtonLabel="Создать"
      sumbitBtnLoading="Сохранение..."
      isLoading={isLoading}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input"
        id="title-input"
        name="title"
        required
        placeholder="Название"
        minLength="2"
        maxLength="30"
        autoComplete="off"
        value={cardName}
        onChange={(e) => setCardName(e.target.value)}
      />
      <span className="popup__input-error title-input-error"></span>
      <input
        type="url"
        className="popup__input"
        id="link-input"
        name="url"
        required
        placeholder="Ссылка на картинку"
        autoComplete="off"
        value={cardLink}
        onChange={(e) => setCardLink(e.target.value)}
      />
      <span className="popup__input-error link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddCard;
