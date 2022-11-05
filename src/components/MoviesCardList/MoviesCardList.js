import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  cards,
  handleMovieButtonClick,
  isMovieJS,
  isError,
  handleMovieDelete,
  handleShowMoreButtonClick,
  isAllCardsRendered,
  savedMovies,
  isLoadingCardSave
}) {
  return (
    <section className="movies">
      {cards.length > 0 && !isError &&
        <div className="movies__cards">
          {cards.map((card) => (
            <MoviesCard 
            key={card.id ? card.id : card._id} 
            card={card} 
            isMovieJS={isMovieJS} 
            handleMovieButtonClick={handleMovieButtonClick} 
            handleMovieDelete={handleMovieDelete} 
            savedMovies={savedMovies}
            isLoadingCardSave={isLoadingCardSave}
            />
          ))}
        </div>
      }
      {isMovieJS && !isAllCardsRendered &&
        <button onClick={handleShowMoreButtonClick} type="button" className="movies__button-show-more">Ещё</button>
      }
      {cards.length < 1 && !isError &&
        <p className="movies__not-found">Ничего не найдено</p>
      }
      {isError &&
        <p className="movies__not-found">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</p>
      }

    </section>
  );
}

export default MoviesCardList;