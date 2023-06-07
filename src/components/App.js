import React, { useState, useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import Header from "./Header";
import Register from "./Register";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import PopupAddCard from "./AddCardPopup";
import ImagePopup from "./ImagePopup";
import EditAvatar from "./EditAvatarPopup";
import ConfirmationPopup from "./ConfirmationPopup";
import ScrollButton from "./ScrollButton";
import api from "../utils/API";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setAddCardPopupOpen] = useState(false);
  const [isImageViewerPopupOpen, setImageViewerPopupOpen] = useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [imageSrc, setImageSrc] = useState("");
  const [altText, setAltText] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const handleEditAvatarClick = () => setEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setEditProfilePopupOpen(true);
  const handleAddCardClick = () => setAddCardPopupOpen(true);

  function handleConfimationClick(card) {
    setConfirmationPopupOpen(card);
  }

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([data, cards]) => {
        setCurrentUser(data);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardDelete(card) {
    setIsLoading(true);
    api.deleteCard(card._id).then(() => {
      setCards(cards => cards.filter((c) => c._id !== card._id))
    }).catch((error) => console.log(`Error: ${error}`))
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handeleCardLike(card) {

    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLike(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((error) => console.log(`Error: ${error}`));

  }

  function handleEditUserInfo(user) {
    setIsLoading(true);
    api.editUserInfo(user).then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    }).catch((error) => console.log(`Error: ${error}`))
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true)
    api.changeAvatar(avatar).then((res) => {
      setCurrentUser(res)
      closeAllPopups()
    }).catch((error) => console.log(`Error: ${error}`))
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleAddCard(card) {
    setIsLoading(true)
    api.addCard(card).then((res) => {
      setCards([res, ...cards])
      closeAllPopups()
    }).catch((error) => console.log(`Error: ${error}`))
      .finally(() => {
        setIsLoading(false)
      })
  }

  const openImageViewer = (src, name) => {
    setImageSrc(src);
    setAltText(name);
    setImageViewerPopupOpen(true);
  };

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddCardPopupOpen(false);
    setImageViewerPopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmationPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>

          <Route path="/sign-up" element={<Register />} />

          <Route path="/" element={
            <>
              <Header />

              <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddCard={handleAddCardClick}
                onImageClick={openImageViewer}
                onConfirmCardDelete={handleConfimationClick}
                onCardDelete={handleCardDelete}
                onCardLike={handeleCardLike}
                cards={cards}
              />
            </>
          }></Route>

        </Routes>

        <Footer />

        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleEditUserInfo}
          isLoading={isLoading}
        />

        <PopupAddCard
          onClose={closeAllPopups}
          isOpen={isAddCardPopupOpen}
          onAddCard={handleAddCard}
          isLoading={isLoading}
        />

        <EditAvatar
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />

        <ImagePopup
          onClose={closeAllPopups}
          isOpen={isImageViewerPopupOpen}
          imageSrc={imageSrc}
          altText={altText}
        />

        <ScrollButton />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
