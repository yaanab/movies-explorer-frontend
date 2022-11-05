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
  handleMovieButtonClick,
  searchWord,
  savedMovies,
  isLoadingCardSave
}) {
  const [renderedCards, setRenderedCards] = useState([]);
  const [isAllCardsRendered, setIsAllCardsRendered] = useState(false);

  useEffect(() => {
    setRenderedCards(sliceFirstRenderedCards(cards));
  }, [cards]);

  useEffect(() => {
    setIsAllCardsRendered(cards.length === renderedCards.length);
  }, [cards, renderedCards]);

  useEffect(() => {
    function onResize() {
      setTimeout(() => setRenderedCards(sliceFirstRenderedCards(cards)), 2000);
    }

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    }
  }, []);

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

  function handleShowMoreButtonClick() {
    const screenWidth = window.screen.width;

    if (screenWidth < 1279 && (cards.length - renderedCards.length > 2)) {
      setRenderedCards(cards.slice(0, renderedCards.length + 2));
      return;
    } else if (screenWidth >= 1279 && (cards.length - renderedCards.length > 3)) {
      setRenderedCards(cards.slice(0, renderedCards.length + 3));
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
          handleMovieButtonClick={handleMovieButtonClick}
          isMovieJS={true}
          isError={isError}
          handleShowMoreButtonClick={handleShowMoreButtonClick}
          isAllCardsRendered={isAllCardsRendered}
          savedMovies={savedMovies}
          isLoadingCardSave={isLoadingCardSave}
        />
      }
      {isLoading &&
        <Preloader />
      }
    </main>
  );
}

export default Movies;