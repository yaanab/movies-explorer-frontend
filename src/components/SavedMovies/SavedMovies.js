import React, { useState, useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../PreLoader/Preloader";

function SavedMovies({
  handleMovieDelete,
  isError,
  isLoading,
  cards,
  isLoadingCardSave
}) {
  const [searchWord, setSearchWord] = useState("");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [foundedMovies, setFoundedMovies] = useState([]);
  const [renderedCards, setRenderedCards] = useState(cards);

  useEffect(() => {
    setRenderedCards(cards);
  }, [cards]);

  useEffect(() => {
    if (isCheckboxChecked && searchWord.length < 1) {
      const filteredMovies = cards.filter((movie) => movie.duration <= 40);
      setRenderedCards(filteredMovies);
    } else if (isCheckboxChecked && searchWord.length >= 1) {
      const filteredMovies = foundedMovies.filter((movie) => movie.duration <= 40);
      setRenderedCards(filteredMovies);
    } else {
      setRenderedCards(cards);
    }
  }, [isCheckboxChecked]);

  function handleSearchMovies(word) {
    setSearchWord(word);
    const foundedMovies = cards.filter((movie) => movie.nameRU.toLowerCase().includes(word.toLowerCase()));
    setFoundedMovies(foundedMovies);

    if (isCheckboxChecked) {
      const filteredMovies = foundedMovies.filter((movie) => movie.duration <= 40);
      setRenderedCards(filteredMovies);
    } else {
      setRenderedCards(foundedMovies);
    }
  }

  function checkboxCheck() {
    if (isCheckboxChecked) {
      setIsCheckboxChecked(false);
    } else {
      setIsCheckboxChecked(true);
    }
  }

  return (
    <main className="saved-movies__content">
      <SearchForm
        isCheckboxChecked={isCheckboxChecked}
        onSearchMovies={handleSearchMovies}
        onCheckboxCheck={checkboxCheck}
        searchWord={searchWord}
      />
      {!isLoading &&
        <MoviesCardList
          cards={renderedCards}
          isError={isError}
          isMovieJS={false}
          handleMovieDelete={handleMovieDelete}
          isLoadingCardSave={isLoadingCardSave}
        />
      }
      {isLoading &&
        <Preloader />
      }
    </main>
  );
}

export default SavedMovies;