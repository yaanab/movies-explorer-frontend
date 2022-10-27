import React, { useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
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

  const [isloggedIn, setLoggedIn] = useState(true);
  const [isNavPopupOpen, setIsNavPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(true);

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

  return (
    <div className="app_content">
      <div className="app_page">
        <Switch>
          <Route exact path="/">
            <div className="header__main">
              <Header
                isloggedIn={isloggedIn}
                isNavPopupOpen={isNavPopupOpen}
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
              onNavMenuClick={handleNavMenuClick}
              onNavPopupClose={handleNavPopupClose}
            />
            <Movies
              cards={cards}
              isLoading={isLoading}
              isButtonClicked={isButtonClicked}
              isFilmSaved={false}
            />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            <Header
              isloggedIn={isloggedIn}
              isNavPopupOpen={isNavPopupOpen}
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
              onNavMenuClick={handleNavMenuClick}
              onNavPopupClose={handleNavPopupClose}
            />
            <Profile />
          </Route>
          <Route path="/signup">
            <Register />
          </Route>
          <Route path="/signin">
            <Login />
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
