import React from "react";

function ConfirmationPopup({ isOpen, onClose, onCardDelete, isLoading, onOverlayClick }) {
  
  function handleDeleteClick(e) {
    e.preventDefault()
    onCardDelete(isOpen);
    onClose();
  }

  return (
    <div className={`popup popup_delete-card ${isOpen ? "popup_opened" : ""}`} onMouseUp={onOverlayClick}>
      <div className="popup__container">
        <button
          aria-label="Закрыть"
          type="button"
          className="popup__btn-close"
          onClick={onClose}
        ></button>
        <h2 className="popup__title popup__title_confirm">Вы уверены?</h2>
        <form
          className="popup__form"
          name="delete-card-form"
          noValidate
        >
          <button
            aria-label="Да"
            type="submit"
            className="popup__btn-save popup__btn-confirm"
            onClick={handleDeleteClick}
          >
            {isLoading ? "Удаление..." : "Да"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
