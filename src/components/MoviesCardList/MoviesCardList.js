import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  cards,
  handleMovieSave,
  isMovieJS,
  isError,
  handleMovieDelete,
  handleShowMoreButtonClick,
  isAllCardsRendered,
  savedMovies,
  isLoadingCardSave,
  isCardsSearching
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
              handleMovieSave={handleMovieSave}
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
      {!isCardsSearching && cards.length < 1 && !isError &&
        <p className="movies__not-found">Ничего не найдено</p>
      }
      {isError &&
        <p className="movies__not-found">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.</p>
      }
      {isCardsSearching && !isError &&
        <p className="movies__not-found">Для поиска фильмов введите ключевое слово в строку поиска</p>
      }

    </section>
  );
}

export default MoviesCardList;