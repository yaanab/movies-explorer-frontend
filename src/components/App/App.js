import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, useHistory, Redirect } from 'react-router-dom';
import '../../index.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { useFormWithValidation } from '../../hooks/useForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';

function App() {

  const {
    PATTERN_NAME,
    INPUT_VALIDATION_MESSAGE_DEFAULT,
    INPUT_VALIDATION_MESSAGE_NAME,
    SERVER_ERROR_MESSAGE_CONFLICT,
    SERVER_ERROR_MESSAGE_VALIDATION,
    SERVER_ERROR_MESSAGE_500,
    SERVER_ERROR_MESSAGE_TOKEN,
    SERVER_ERROR_MESSAGE_LOGIN,
    SERVER_ERROR_MESSAGE_USER_UPDATE,
    SHORT_MOVIE_DURATION
  } = require('../../utils/Constant');

  const { resetForm } = useFormWithValidation({});
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isNavPopupOpen, setIsNavPopupOpen] = useState(false);
  const [isSendingUserDataToServer, setisSendingUserDataToServer] = useState(false);
  const [isServerErrorMessage, setIsServerErrorMessage] = useState("");
  const [isServerErrorRegister, setIsServerErrorRegister] = useState(false);
  const [isServerErrorLogin, setIsServerErrorLogin] = useState(false);
  const [isServerErrorProfile, setIsServerErrorProfile] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isProfileUpdateMessageSuccess, setIsProfileUpdateMessageSuccess] = useState(false);

  const isCardInLocalStorage = localStorage.getItem("cards");
  const isSearchWordInLocalStorage = localStorage.getItem("searchWord");
  const isCheckboxCheckedInLocalStorage = localStorage.getItem("isCheckboxChecked");
  const isFoundedMoviesInLocalStorage = localStorage.getItem("foundedMovies");

  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [isLoadingSavedCards, setIsLoadingSavedCards] = useState(false);
  const [isLoadingCardSave, setIsLoadingCardSave] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [cards, setCards] = useState(isCardInLocalStorage ? JSON.parse(isCardInLocalStorage) : []);
  const [searchWord, setSearchWord] = useState(isSearchWordInLocalStorage ? JSON.parse(isSearchWordInLocalStorage) : "");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(isCheckboxCheckedInLocalStorage ? JSON.parse(isCheckboxCheckedInLocalStorage) : false);
  const [foundedMovies, setFoundedMovies] = useState(isFoundedMoviesInLocalStorage ? JSON.parse(isFoundedMoviesInLocalStorage) : []);
  const [renderedCards, setRenderedCards] = useState([]);
  const [isErrorLoadingCards, setIsErrorLoadingCards] = useState(false);
  const [isErrorLoadingSavedCards, setIsErrorLoadingSavedCards] = useState(false);
  const [isCardsSearching, setIsCardsSearching] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getContent(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          onLogOut();
          console.log(err);
        });
    } else {
      onLogOut();
    }
  }, []);

  useEffect(() => {
    setIsLoadingSavedCards(true)
    Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
      .then(([userData, savedMovies]) => {
        setCurrentUser(userData);
        setSavedMovies(savedMovies);
      })
      .catch((err) => {
        console.log(err)
        setIsErrorLoadingSavedCards(true);
      })
      .finally(() => {
        setIsLoadingSavedCards(false);
      });
  }, [isLoggedIn]);

  useEffect(() => {
    if (cards.length < 1 && isLoggedIn) {
      setIsLoadingCards(true);
      moviesApi.getMovies()
        .then((cards) => {
          setCards(cards);
          localStorage.setItem("cards", JSON.stringify(cards));
          setIsErrorLoadingCards(false);
        })
        .catch((err) => {
          console.log(err);
          setIsErrorLoadingCards(true);
        })
        .finally(() => {
          setIsLoadingCards(false);
          setIsCardsSearching(true);
        });
    }
  }, [isLoggedIn]);

  function handleNavMenuClick() {
    setIsNavPopupOpen(true);
  }

  function handleNavPopupClose() {
    setIsNavPopupOpen(false);
  }

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        handleNavPopupClose();
      }
    }

    if (isNavPopupOpen) {
      document.addEventListener('keydown', handleEscClose);
    }

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isNavPopupOpen]);

  function handleUserRegister(name, email, password) {
    setisSendingUserDataToServer(true);
    mainApi.register(name, email, password)
      .then((res) => {
        if (res.token) {
          setIsLoggedIn(true);
          history.push('/movies');
          setIsServerErrorLogin(false);
          resetForm();
        } else if (!res.token) {
          setIsServerErrorMessage(SERVER_ERROR_MESSAGE_TOKEN);
          setIsServerErrorLogin(true);
        }
      })
      .catch((err) => {
        if (err === "Ошибка: 409") {
          setIsServerErrorMessage(SERVER_ERROR_MESSAGE_CONFLICT);
        } else if (err === "Ошибка: 400") {
          setIsServerErrorMessage(SERVER_ERROR_MESSAGE_VALIDATION);
        } else if (err === "Ошибка: 401") {
          setIsServerErrorMessage(SERVER_ERROR_MESSAGE_LOGIN);
        } else {
          setIsServerErrorMessage(SERVER_ERROR_MESSAGE_500);
        }
        setIsServerErrorRegister(true);
      })
      .finally(() => {
        setisSendingUserDataToServer(false);
        setTimeout(() => setIsServerErrorRegister(false), 2000);
      });
  }

  function handleUserLogin(email, password) {
    if (!password || !email) {
      return;
    }
    setisSendingUserDataToServer(true);
    mainApi.authorize(email, password)
      .then((res) => {
        if (res.token) {
          setIsLoggedIn(true);
          history.push('/movies');
          setIsServerErrorLogin(false);
          resetForm();
        } else if (!res.token) {
          setIsServerErrorMessage(SERVER_ERROR_MESSAGE_TOKEN);
          setIsServerErrorLogin(true);
        }
      })
      .catch((err) => {
        if (err === "Ошибка: 401") {
          setIsServerErrorMessage(SERVER_ERROR_MESSAGE_LOGIN);
        } else {
          setIsServerErrorMessage(SERVER_ERROR_MESSAGE_500);
        }
        setIsServerErrorLogin(true);
      })
      .finally(() => {
        setisSendingUserDataToServer(false);
        setTimeout(() => setIsServerErrorLogin(false), 2000);
      });
  }

  function onLogOut() {
    mainApi.logOut()
      .then(() => {
        setIsLoggedIn(false);
        localStorage.removeItem("jwt");
        localStorage.removeItem("cards");
        localStorage.removeItem("searchWord");
        localStorage.removeItem("isCheckboxChecked");
        localStorage.removeItem("foundedMovies");
        localStorage.removeItem("filteredMovies");
        setCards([]);
        setSearchWord("");
        setIsCheckboxChecked(false);
        setFoundedMovies([]);
        setRenderedCards([]);
        setSavedMovies([]);
        setIsErrorLoadingCards(false);
        setIsErrorLoadingSavedCards(false);
        history.push('/');
      })
      .catch((err) => console.log(err));
  }

  function onSetIsEditUserProfile() {
    setIsEditProfile(true);
  }

  function onUpdateUser(name, email) {
    setisSendingUserDataToServer(true);
    mainApi
      .editProfile(name, email)
      .then((user) => {
        setCurrentUser(user);
        setIsServerErrorProfile(false);
        setIsEditProfile(false);
        setIsProfileUpdateMessageSuccess(true);
        setTimeout(() => setIsProfileUpdateMessageSuccess(false), 3000);
      })
      .catch((err) => {
        console.log(err)
        if (err === "Ошибка: 409") {
          setIsServerErrorMessage(SERVER_ERROR_MESSAGE_CONFLICT);
        } else if (err === "Ошибка: 400") {
          setIsServerErrorMessage(SERVER_ERROR_MESSAGE_VALIDATION);
        } else {
          setIsServerErrorMessage(SERVER_ERROR_MESSAGE_USER_UPDATE);
        }
        setIsServerErrorProfile(true);
      })
      .finally(() => {
        setisSendingUserDataToServer(false);
        setTimeout(() => setIsServerErrorProfile(false), 2000);
      });
  }

  useEffect(() => {
    if (isCheckboxChecked) {
      const filteredMovies = foundedMovies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
      setRenderedCards(filteredMovies);
      localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
    } else {
      setRenderedCards(foundedMovies);
    }
  }, [isCheckboxChecked]);

  function handleSearchMovies(word) {
    localStorage.removeItem("searchWord");
    localStorage.removeItem("foundedMovies");
    localStorage.removeItem("filteredMovies");

    setSearchWord(word);
    const foundedMovies = cards.filter((movie) => movie.nameRU.toLowerCase().includes(word.toLowerCase()));
    setFoundedMovies(foundedMovies);

    localStorage.setItem("searchWord", JSON.stringify(word));
    localStorage.setItem("foundedMovies", JSON.stringify(foundedMovies));

    if (isCheckboxChecked) {
      const filteredMovies = foundedMovies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
      setRenderedCards(filteredMovies);
      setIsCardsSearching(false);
      localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
    } else {
      localStorage.setItem("isCheckboxChecked", JSON.stringify(false));
      setRenderedCards(foundedMovies);
      setIsCardsSearching(false);
    }
  }

  function checkboxCheck() {
    if (isCheckboxChecked) {
      setIsCheckboxChecked(false);
      localStorage.setItem("isCheckboxChecked", JSON.stringify(false));
    } else {
      setIsCheckboxChecked(true);
      localStorage.setItem("isCheckboxChecked", JSON.stringify(true));
    }
  }

  function handleMovieSave(card) {
    setIsLoadingCardSave(true);
    mainApi
      .saveMovie({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `https://api.nomoreparties.co${card.image.url}`,
        trailerLink: card.trailerLink,
        thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN
      })
      .then((newCard) => {
        setSavedMovies([...savedMovies, newCard]);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingCardSave(false));
  }

  function handleMovieDelete(card) {
    setIsLoadingCardSave(true);
    const cardId = (card._id ? card._id : savedMovies.find((savedMovie) => savedMovie.movieId === card.id)._id);
    mainApi
      .deleteMovie(cardId)
      .then(() => {
        setSavedMovies(savedMovies.filter((savedMovie) => savedMovie._id !== cardId));
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoadingCardSave(false));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app_content">
        <div className="app_page">
          <Switch>
            <Route exact path="/">
              <div className="header__main">
                <Header
                  isLoggedIn={isLoggedIn}
                  isNavPopupOpen={isNavPopupOpen}
                  setIsNavPopupOpen={setIsNavPopupOpen}
                  onNavMenuClick={handleNavMenuClick}
                  onNavPopupClose={handleNavPopupClose}
                />
              </div>
              <Main />
              <Footer />
            </Route>
            <ProtectedRoute
              path="/movies"
              isLoggedIn={isLoggedIn}
              component={() => {
                return (
                  <>
                    <Header
                      isLoggedIn={isLoggedIn}
                      isNavPopupOpen={isNavPopupOpen}
                      setIsNavPopupOpen={setIsNavPopupOpen}
                      onNavMenuClick={handleNavMenuClick}
                      onNavPopupClose={handleNavPopupClose}
                    />
                    <Movies
                      handleSearchMovies={handleSearchMovies}
                      isCheckboxChecked={isCheckboxChecked}
                      onCheckboxCheck={checkboxCheck}
                      isLoading={isLoadingCards}
                      isError={isErrorLoadingCards}
                      cards={renderedCards}
                      handleMovieSave={handleMovieSave}
                      handleMovieDelete={handleMovieDelete}
                      searchWord={searchWord}
                      savedMovies={savedMovies}
                      isCardsSearching={isCardsSearching}
                    />
                    <Footer />
                  </>
                );
              }}
            />
            <ProtectedRoute
              path="/saved-movies"
              isLoggedIn={isLoggedIn}
              component={() => {
                return (
                  <>
                    <Header
                      isLoggedIn={isLoggedIn}
                      isNavPopupOpen={isNavPopupOpen}
                      setIsNavPopupOpen={setIsNavPopupOpen}
                      onNavMenuClick={handleNavMenuClick}
                      onNavPopupClose={handleNavPopupClose}
                    />
                    <SavedMovies
                      handleMovieDelete={handleMovieDelete}
                      isError={isErrorLoadingSavedCards}
                      isLoading={isLoadingSavedCards}
                      cards={savedMovies}
                      savedMovies={savedMovies}
                      isLoadingCardSave={isLoadingCardSave}
                    />
                    <Footer />
                  </>
                );
              }}
            />
            <ProtectedRoute
              path="/profile"
              isLoggedIn={isLoggedIn}
              component={() => {
                return (
                  <>
                    <Header
                      isLoggedIn={isLoggedIn}
                      isNavPopupOpen={isNavPopupOpen}
                      setIsNavPopupOpen={setIsNavPopupOpen}
                      onNavMenuClick={handleNavMenuClick}
                      onNavPopupClose={handleNavPopupClose}
                    />
                    <Profile
                      isEditProfile={isEditProfile}
                      handleEditProfile={onSetIsEditUserProfile}
                      namePattern={PATTERN_NAME}
                      onUpdateUser={onUpdateUser}
                      isSendingUserDataToServer={isSendingUserDataToServer}
                      isServerError={isServerErrorProfile}
                      serverErrorMessage={isServerErrorMessage}
                      inputValidationMessageDefault={INPUT_VALIDATION_MESSAGE_DEFAULT}
                      inputValidationMessageName={INPUT_VALIDATION_MESSAGE_NAME}
                      onLogOut={onLogOut}
                      isProfileUpdateMessageSuccess={isProfileUpdateMessageSuccess}
                    />
                  </>
                );
              }}
            />
            <Route path="/signup">
              {isLoggedIn && <Redirect to="/" />}
              <Register
                onRegister={handleUserRegister}
                isSendingUserDataToServer={isSendingUserDataToServer}
                isServerErrorRegister={isServerErrorRegister}
                isServerErrorMessage={isServerErrorMessage}
                namePattern={PATTERN_NAME}
                inputValidationMessageDefault={INPUT_VALIDATION_MESSAGE_DEFAULT}
                inputValidationMessageName={INPUT_VALIDATION_MESSAGE_NAME}
              />
            </Route>
            <Route path="/signin">
              {isLoggedIn && <Redirect to="/" />}
              <Login
                onLogin={handleUserLogin}
                isSendingUserDataToServer={isSendingUserDataToServer}
                isServerErrorLogin={isServerErrorLogin}
                isServerErrorMessage={isServerErrorMessage}
              />
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
