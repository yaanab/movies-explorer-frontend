import { useState, useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../PreLoader/Preloader";

function Movies({
  handleSearchMovies,
  isCheckboxChecked,
  onCheckboxCheck,
  isLoading,
  isError,
  cards,
  searchWord,
  savedMovies,
  isCardsSearching,
  handleMovieSave,
  handleMovieDelete
}) {
const {
  SCREEN_WIDTH_LAPTOP,
  SCREEN_WIDTH_TABLET,
  CARDS_FIRST_RENDERED_LAPTOP,
  CARDS_FIRST_RENDERED_TABLET,
  CARDS_FIRST_RENDERED_MOBILE,
  CARDS_SHOW_MORE_TABLET_MOBILE,
  CARDS_SHOW_MORE_LAPTOP
} = require('../../utils/Constant');

  const [renderedCards, setRenderedCards] = useState([]);
  const [isAllCardsRendered, setIsAllCardsRendered] = useState(false);

  useEffect(() => {
    function onResize() {
      setTimeout(() => setRenderedCards(sliceFirstRenderedCards(cards)), 1000);
    }

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    }
  }, []);

  useEffect(() => {
    setRenderedCards(sliceFirstRenderedCards(cards));
  }, [cards]);

  useEffect(() => {
    setIsAllCardsRendered(cards.length === renderedCards.length);
  }, [cards, renderedCards]);

  function sliceFirstRenderedCards(cards) {
    const screenWidth = window.screen.width;
    if (cards.length > CARDS_FIRST_RENDERED_MOBILE && screenWidth < SCREEN_WIDTH_TABLET) {
      return cards.slice(0, CARDS_FIRST_RENDERED_MOBILE);
    }
    if (cards.length > CARDS_FIRST_RENDERED_TABLET && screenWidth >= SCREEN_WIDTH_TABLET && screenWidth < SCREEN_WIDTH_LAPTOP) {
      return cards.slice(0, CARDS_FIRST_RENDERED_TABLET);
    }
    if (cards.length > CARDS_FIRST_RENDERED_LAPTOP && screenWidth >= SCREEN_WIDTH_LAPTOP) {
      return cards.slice(0, CARDS_FIRST_RENDERED_LAPTOP);
    }
    return cards;
  }

  function handleShowMoreButtonClick() {
    const screenWidth = window.screen.width;

    if (screenWidth < SCREEN_WIDTH_LAPTOP && (cards.length - renderedCards.length > 2)) {
      setRenderedCards(cards.slice(0, renderedCards.length + CARDS_SHOW_MORE_TABLET_MOBILE));
      return;
    } else if (screenWidth >= SCREEN_WIDTH_LAPTOP && (cards.length - renderedCards.length > CARDS_SHOW_MORE_LAPTOP)) {
      setRenderedCards(cards.slice(0, renderedCards.length + CARDS_SHOW_MORE_LAPTOP));
      return;
    } else {
      setRenderedCards(cards);
      setIsAllCardsRendered(true);
    }
  }

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
          isMovieJS={true}
          isError={isError}
          handleShowMoreButtonClick={handleShowMoreButtonClick}
          isAllCardsRendered={isAllCardsRendered}
          savedMovies={savedMovies}
          isLoading={isLoading}
          isCardsSearching={isCardsSearching}
          handleMovieSave={handleMovieSave}
          handleMovieDelete={handleMovieDelete}
        />
      }
      {isLoading &&
        <Preloader />
      }
    </main>
  );
}

export default Movies;