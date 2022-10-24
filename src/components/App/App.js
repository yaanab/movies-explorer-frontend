import React, { useState } from 'react';
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

  const [loggedIn, setLoggedIn] = useState(false);
  const [isNavPopupOpen, setIsNavPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(true);

  function havdleNavPopupOpen() {
    setIsNavPopupOpen(true);
  }

  function havdleNavPopupClose() {
    setIsNavPopupOpen(false);
  }

  return (
    <div className="app_content">
      <div className="app_page">
        <Switch>
          <Route exact path="/">
            <Header
              loggedIn={loggedIn}
            />
            <Main />
            <Footer />
          </Route>
          <Route path="/movies">
            <Header
              isNavPopupOpen={isNavPopupOpen}
              onNavMenuClick={havdleNavPopupOpen}
              onNavPopupClose={havdleNavPopupClose}
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
              isNavPopupOpen={isNavPopupOpen}
              onNavMenuClick={havdleNavPopupOpen}
              onNavPopupClose={havdleNavPopupClose}
            />
            <SavedMovies
              cards={cards}
              isFilmSaved={true}
            />
            <Footer />
          </Route>
          <Route path="/profile">
            <Header
              isNavPopupOpen={isNavPopupOpen}
              onNavMenuClick={havdleNavPopupOpen}
              onNavPopupClose={havdleNavPopupClose}
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
