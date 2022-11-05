import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  cards,
  handleMovieButtonClick,
  isButtonClicked,
  isMovieJS,
  isMovieSaved,
  isError,
  handleMovieDelete
}) {
  // const [renderedCard, setRenderedCards] = useState([]);

  // useEffect(() => {
  //   setRenderedCards(cards);
  // }, [cards])

  return (
    <section className="movies">
      {cards.length > 0 && !isError &&
        <div className="movies__cards">
          {cards.map((card, index) => (
            <MoviesCard key={index} card={card} isMovieJS={isMovieJS} handleMovieButtonClick={handleMovieButtonClick} isMovieSaved={isMovieSaved} isButtonClicked={isButtonClicked} handleMovieDelete={handleMovieDelete} />
          ))}
        </div>
      }
      {isMovieJS &&
        <button type="button" className="movies__button-show-more">Ещё</button>
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