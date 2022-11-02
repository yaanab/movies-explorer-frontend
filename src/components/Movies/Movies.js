import React, { useState, useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../PreLoader/Preloader";
import * as moviesApi from '../../utils/MoviesApi';

function Movies({ isLoading, onSearchMovies, isCheckboxChecked, isMovieFounded, isMovieSaved }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    moviesApi.getMovies()
      .then((cards) => {
        setCards(cards);
        console.log(cards)
      })
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <main className="movies__content">
      <SearchForm 
      onSearchMovies={onSearchMovies}
      isCheckboxChecked={isCheckboxChecked}
      />
      {!isLoading &&
        <MoviesCardList
          cards={cards}
          isMovieFounded={isMovieFounded}
          isMovieSaved={isMovieSaved}
        />
      }
      {isLoading &&
        <Preloader />
      }
    </main>
  );
}

export default Movies;