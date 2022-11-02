import React, { useState, useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../PreLoader/Preloader";
import * as moviesApi from '../../utils/MoviesApi';

function Movies({ }) {
  const isSearchWordInLocalStorage = JSON.parse(localStorage.getItem("searchWord"));
  const isFoundedMoviesInLocalStorage = JSON.parse(localStorage.getItem("foundedMovies"));
  const isFilteredMoviesInLocalStorage = JSON.parse(localStorage.getItem("filteredMovies"));
  const isCheckboxCheckedInLocalStorage = JSON.parse(localStorage.getItem("isCheckboxChecked"));

  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [foundedMovies, setFoundedMovies] = useState([]); // submit по слову
  const [filteredMovies, setFilteredMovies] = useState([]); // слова после фильтра
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // чекбокс состояние
  const [renderedCards, setIsRenderedCards] = useState([]); // отрисованные карточки

  useEffect(() => {
    moviesApi.getMovies()
      .then((cards) => {
        setCards(cards);
        console.log(cards)
      })
      .catch((err) => console.log(err));
  }, []);

  function foundCards (word) {
    cards.filter((card) => card.nameRU.toLowerCase().includes(word.toLowerCase()));
  }

function searchMovie (word) {
  setIsLoading(true);
  if (!searchWord === word) {
    localStorage.removeItem("searchWord");
    localStorage.removeItem("foundedMovies");
    localStorage.removeItem("filteredMovies");

  }
}


  return (
    <main className="movies__content">
      <SearchForm
        isCheckboxChecked={isCheckboxChecked}
      />
      {!isLoading &&
        <MoviesCardList
          cards={renderedCards}
          isLoading={isLoading}
        />
      }
      {isLoading &&
        <Preloader />
      }
    </main>
  );
}

export default Movies;