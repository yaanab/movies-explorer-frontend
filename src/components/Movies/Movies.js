import React, { useState, useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../PreLoader/Preloader";

function Movies({
  handleMovieButtonClick,
  isCheckboxChecked,
  handleSearchMovies,
  onCheckboxCheck,
  searchWord,
  cards,
  isLoading,
  isError
}) {

  const [renderedCards, setRenderedCards] = useState(sliceFirstRenderedCards(cards));
  const [isAllCardsRendered, setIsAllCardsRendered] = useState(false);

  function sliceFirstRenderedCards(cards) {
    const screenWidth = window.screen.width;
    if (cards.length > 5 && screenWidth < 656) {
      return cards.slice(0, 5);
    }
    if (cards.length > 8 && screenWidth >= 656 && screenWidth < 1279) {
      return cards.slice(0, 8);
    }
    if (cards.length > 12 && screenWidth >= 1279) {
      return cards.slice(0, 12);
    }
    return cards;
  }

  useEffect(() => {
    function onResize() {
      setTimeout(() => setRenderedCards(sliceFirstRenderedCards(cards)), 2000);
    }

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    }
  }, []);


  return (
    <main className="movies__content">
      <SearchForm
        isCheckboxChecked={isCheckboxChecked}
        onSearchMovies={handleSearchMovies}
        onCheckboxCheck={onCheckboxCheck}
        searchWord={searchWord}
      />
      {!isLoading &&
        <MoviesCardList
          cards={renderedCards}
          isLoading={isLoading}
          isMovieJS={true}
          isError={isError}
          handleMovieButtonClick={handleMovieButtonClick}
        />
      }
      {isLoading &&
        <Preloader />
      }
    </main>
  );
}

export default Movies;