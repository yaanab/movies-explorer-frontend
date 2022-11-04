import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards, onMovieSave, isButtonClicked, isMovieJS, isMovieSaved, isError }) {
console.log(cards)
  return (
    <section className="movies">
      {cards.length > 0 && !isError &&
        <>
          <div className="movies__cards">
            {cards.map((card) => (
              <MoviesCard key={card.id || card._id} card={card} isMovieJS={isMovieJS} onMovieSave={onMovieSave} isMovieSaved={isMovieSaved} isButtonClicked={isButtonClicked} />
            ))}
          </div>
          <button type="button" className="movies__button-show-more">Ещё</button>
        </>
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