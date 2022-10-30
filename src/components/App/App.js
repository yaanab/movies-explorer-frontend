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

import movieImg1 from "../../images/movie-img-1.png";
import movieImg2 from "../../images/movie-img-2.png";

function App() {

  const cards = [
    {
      'nameRU': '33 слова о дизайне',
      'duration': '1ч 47м',
      'image': movieImg2,
      'movieId': '1265458'
    },
    {
      'nameRU': '33 слова о дизайне',
      'duration': '1ч 47м',
      'image': movieImg1,
      'movieId': '1265488'
    },
    {
      'nameRU': '33 слова о дизайне',
      'duration': '1ч 47м',
      'image': movieImg2,
      'movieId': '1265555'
    },
    {
      'nameRU': '33 слова о дизайне',
      'duration': '1ч 47м',
      'image': movieImg1,
      'movieId': '1233333'
    },
  ]

  const {
    emailPattern,
    namePattern,
    inputValidationMessageDefault,
    inputValidationMessageName,
    inputValidationMessageEmail,
    serverConflictError,
    serverValidationError,
    serverErrorMain,
    serverErrorToken,
    serverErrorLogin,
    serverErrorUpdateUser,
  } = require('../../utils/Constant');

  const { resetForm } = useFormWithValidation({});
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isNavPopupOpen, setIsNavPopupOpen] = useState(false);
  const [isSendingUserDataToServer, setisSendingUserDataToServer] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(true);
  const [isServerErrorMessage, setIsServerErrorMessage] = useState("");
  const [isServerErrorRegister, setIsServerErrorRegister] = useState(false);
  const [isServerErrorLogin, setIsServerErrorLogin] = useState(false);
  const [isServerErrorProfile, setIsServerErrorProfile] = useState(false);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [isProfileUpdateMessageSuccess, setIsProfileUpdateMessageSuccess] = useState(false);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi.getUserInfo()
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setIsLoggedIn(true);
            history.push('/movies');
          }
        })
        .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi.getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => console.log(err));
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
  }, [isNavPopupOpen])

  function handleUserRegister(name, email, password) {
    setisSendingUserDataToServer(true);
    mainApi.register(name, email, password)
      .then((res) => {
        if (res.token) {
          console.log(res.token);
          setIsLoggedIn(true);
          history.push('/movies');
          setIsServerErrorLogin(false);
          resetForm();
        } else if (!res.token) {
          setIsServerErrorMessage(serverErrorToken);
          setIsServerErrorLogin(true);
        }
      })
      .catch((err) => {
        if (err === "Ошибка: 409") {
          setIsServerErrorMessage(serverConflictError);
        } else if (err === "Ошибка: 400") {
          setIsServerErrorMessage(serverValidationError);
        } else if (err === "Ошибка: 401") {
          setIsServerErrorMessage(serverErrorLogin);
        } else {
          setIsServerErrorMessage(serverErrorMain);
        }
        setIsServerErrorRegister(true);
      })
      .finally(() => {
        setisSendingUserDataToServer(false);
        setTimeout(() => setIsServerErrorRegister(false), 2000);
      });;
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
          setIsServerErrorMessage(serverErrorToken);
          setIsServerErrorLogin(true);
        }
      })
      .catch((err) => {
        if (err === "Ошибка: 401") {
          setIsServerErrorMessage(serverErrorLogin);
        } else {
          setIsServerErrorMessage(serverErrorMain);
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
        localStorage.removeItem('jwt');
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
          setIsServerErrorMessage(serverConflictError);
        } else if (err === "Ошибка: 400") {
          setIsServerErrorMessage(serverValidationError);
        } else {
          setIsServerErrorMessage(serverErrorUpdateUser);
        }
        setIsServerErrorProfile(true);
      })
      .finally(() => {
        setisSendingUserDataToServer(false);
        setTimeout(() => setIsServerErrorProfile(false), 2000);
      });
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
                      cards={cards}
                      isSendingUserDataToServer={isSendingUserDataToServer}
                      isButtonClicked={isButtonClicked}
                      isFilmSaved={false}
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
                      cards={cards}
                      isFilmSaved={true}
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
                      emailPattern={emailPattern}
                      namePattern={namePattern}
                      onUpdateUser={onUpdateUser}
                      isSendingUserDataToServer={isSendingUserDataToServer}
                      isServerError={isServerErrorProfile}
                      serverErrorMessage={isServerErrorMessage}
                      inputValidationMessageDefault={inputValidationMessageDefault}
                      inputValidationMessageName={inputValidationMessageName}
                      inputValidationMessageEmail={inputValidationMessageEmail}
                      onLogOut={onLogOut}
                      isProfileUpdateMessageSuccess={isProfileUpdateMessageSuccess}
                    />
                  </>
                );
              }}
            />
            <Route path="/signup">
              <Register
                onRegister={handleUserRegister}
                isSendingUserDataToServer={isSendingUserDataToServer}
                isServerErrorRegister={isServerErrorRegister}
                isServerErrorMessage={isServerErrorMessage}
                emailPattern={emailPattern}
                namePattern={namePattern}
                inputValidationMessageDefault={inputValidationMessageDefault}
                inputValidationMessageName={inputValidationMessageName}
                inputValidationMessageEmail={inputValidationMessageEmail}
              />
            </Route>
            <Route path="/signin">
              <Login
                onLogin={handleUserLogin}
                isSendingUserDataToServer={isSendingUserDataToServer}
                isServerErrorLogin={isServerErrorLogin}
                isServerErrorMessage={isServerErrorMessage}
                emailPattern={emailPattern}
                inputValidationMessageDefault={inputValidationMessageDefault}
                inputValidationMessageName={inputValidationMessageName}
                inputValidationMessageEmail={inputValidationMessageEmail}
              />
            </Route>
            <Route>
              {isLoggedIn ? <Redirect to="/movies" /> : <Redirect to="/signin" />}
            </Route>
            <Route>
              <PageNotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
