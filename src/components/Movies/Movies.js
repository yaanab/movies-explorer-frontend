import React, { useState, useEffect, useContext } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../PreLoader/Preloader";
import * as moviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';

import MoviesCard from '../MoviesCard/MoviesCard';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Movies({ savedMovies }) {
  const currentUser = useContext(CurrentUserContext);

  const isCardInLocalStorage = localStorage.getItem("cards");
  const isSearchWordInLocalStorage = localStorage.getItem("searchWord");
  const isCheckboxCheckedInLocalStorage = localStorage.getItem("isCheckboxChecked");
  const isFoundedMoviesInLocalStorage = localStorage.getItem("foundedMovies");
  const isFilteredMoviesInLocalStorage = localStorage.getItem("filteredMovies");

  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState(isCardInLocalStorage ? JSON.parse(isCardInLocalStorage) : []);
  const [searchWord, setSearchWord] = useState(isSearchWordInLocalStorage ? JSON.parse(isSearchWordInLocalStorage) : "");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(isCheckboxCheckedInLocalStorage ? JSON.parse(isCheckboxCheckedInLocalStorage) : false);
  const [foundedMovies, setFoundedMovies] = useState(isFoundedMoviesInLocalStorage ? JSON.parse(isFoundedMoviesInLocalStorage) : []);
  const [filteredMovies, setFilteredMovies] = useState(isFilteredMoviesInLocalStorage ? JSON.parse(isFilteredMoviesInLocalStorage) : []);
  const [renderedCards, setRenderedCards] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (cards.length < 1) {
      moviesApi.getMovies()
        .then((cards) => {
          setCards(cards);
          localStorage.setItem("cards", JSON.stringify(cards));
        })
        .catch((err) => {
          console.log(err);
          setIsError(true);
        });
    }
  }, []);

  useEffect(() => {
    if (isCheckboxChecked) {
      const filteredMovies = foundedMovies.filter((movie) => movie.duration <= 40);
      setRenderedCards(filteredMovies);

    } else {
      setRenderedCards(foundedMovies);
    }
  }, [isCheckboxChecked])

  function searchMovies(word) {
    setIsLoading(true);

    localStorage.removeItem("searchWord");
    localStorage.removeItem("foundedMovies");
    localStorage.removeItem("filteredMovies");

    setSearchWord(word);
    const foundedMovies = cards.filter((movie) => movie.nameRU.toLowerCase().includes(word.toLowerCase()));
    setFoundedMovies(foundedMovies);

    localStorage.setItem("searchWord", JSON.stringify(word));
    localStorage.setItem("foundedMovies", JSON.stringify(foundedMovies));

    if (isCheckboxChecked) {
      const filteredMovies = foundedMovies.filter((movie) => movie.duration <= 40);
      setRenderedCards(filteredMovies);
      localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
      setIsLoading(false);
    } else {
      localStorage.setItem("isCheckboxChecked", JSON.stringify(false));
      setRenderedCards(foundedMovies);
      setIsLoading(false);
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
    const isSaved = savedMovies.find((movie) => movie.id === card.id);
    if (!isSaved) {
      mainApi
        .saveMovie(
          card.country,
          card.director,
          card.duration,
          card.year,
          card.description,
          card.image,
          card.trailerLink,
          card.thumbnail,
          card.movieId,
          card.nameRU,
          card.nameEN
        )
    }
  }

  return (
    <main className="movies__content">
      <SearchForm
        isCheckboxChecked={isCheckboxChecked}
        onSearchMovies={searchMovies}
        onCheckboxCheck={checkboxCheck}
        searchWord={searchWord}
      />
      {!isLoading &&
        <MoviesCardList
          cards={renderedCards}
          isLoading={isLoading}
          isMovieJS={true}
          isError={isError}
        // isMovieSaved={false}
        />
      }
      {isLoading &&
        <Preloader />
      }
    </main>
  );
}

export default Movies;