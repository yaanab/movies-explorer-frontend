import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter, useHistory } from 'react-router-dom';
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
import { useFormWithValidation } from '../../hooks/useForm';
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

  const { resetForm } = useFormWithValidation({});

  const history = useHistory();
  const [isloggedIn, setLoggedIn] = useState(false);
  const [isNavPopupOpen, setIsNavPopupOpen] = useState(false);
  const [isSendingUserDataToServer, setisSendingUserDataToServer] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(true);
  const [isServerErrorMessage, setIsServerErrorMessage] = useState("");
  const [isServerError, setIsServerError] = useState(false);

  const emailPattern = "([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})";
  const namePattern = "^[A-Za-zА-Яа-яё -]+$";
  const inputValidationMessageDefault = "Введите данные в указанном формате.";
  const inputValidationMessageName = "Имя должно содержать только латиницу, кириллицу, пробел или дефис";
  const inputValidationMessageEmail = "Введите данные в формате e-mail";
  const serverConflictError = "Пользователь с таким email уже существует.";
  const serverValidationError = "Переданы некорректные данные.";
  const serverErrorMain = "На сервере произошла ошибка."
  const serverErrorToken = "При авторизации произошла ошибка."
  const serverErrorLogin = "Неправильные email или пароль."

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
        history.push('/signin');
        setIsServerError(false);
        resetForm();
      })
      .catch((err) => {
        if (err === "Ошибка: 409") {
          setIsServerErrorMessage(serverConflictError);
        } else if (err === "Ошибка: 400") {
          setIsServerErrorMessage(serverValidationError);
        } else {
          setIsServerErrorMessage(serverErrorMain);
        }
        setIsServerError(true);
      })
      .finally(() => {
        setisSendingUserDataToServer(false);
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
          setLoggedIn(true);
          // setEmail(email);
          history.push('/movies');
          setIsServerError(false);
          resetForm();
        } else if (!res.token) {
          setIsServerErrorMessage(serverErrorToken);
          setIsServerError(true);
        }
      })
      .catch((err) => {
        console.log(err)
        if (err === "Ошибка: 401") {
          setIsServerErrorMessage(serverErrorLogin);
        } else {
          setIsServerErrorMessage(serverErrorMain);
        }
        setIsServerError(true);
      })
      .finally(() => {
        setisSendingUserDataToServer(false);
      });
  }

  return (
    <div className="app_content">
      <div className="app_page">
        <Switch>
          <Route exact path="/">
            <div className="header__main">
              <Header
                isloggedIn={isloggedIn}
                isNavPopupOpen={isNavPopupOpen}
                setIsNavPopupOpen={setIsNavPopupOpen}
                onNavMenuClick={handleNavMenuClick}
                onNavPopupClose={handleNavPopupClose}
              />
            </div>
            <Main />
            <Footer />
          </Route>
          <Route path="/movies">
            <Header
              isloggedIn={isloggedIn}
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
          </Route>
          <Route path="/saved-movies">
            <Header
              isloggedIn={isloggedIn}
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
          </Route>
          <Route path="/profile">
            <Header
              isloggedIn={isloggedIn}
              isNavPopupOpen={isNavPopupOpen}
              setIsNavPopupOpen={setIsNavPopupOpen}
              onNavMenuClick={handleNavMenuClick}
              onNavPopupClose={handleNavPopupClose}
            />
            <Profile/>
          </Route>
          <Route path="/signup">
            <Register
              onRegister={handleUserRegister}
              isSendingUserDataToServer={isSendingUserDataToServer}
              isServerError={isServerError}
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
              isServerError={isServerError}
              isServerErrorMessage={isServerErrorMessage}
              emailPattern={emailPattern}
              inputValidationMessageDefault={inputValidationMessageDefault}
              inputValidationMessageName={inputValidationMessageName}
              inputValidationMessageEmail={inputValidationMessageEmail}
            />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
