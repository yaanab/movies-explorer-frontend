import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ cards, isButtonClicked, isFilmSaved }) {
  return (
    <section className="movies">
      <div className="movies__cards">
        {cards.map((card) => (
          <MoviesCard key={card.movieId} card={card} isFilmSaved={isFilmSaved} isButtonClicked={isButtonClicked} />
        ))}
      </div>
      <button type="button" className="movies__button-show-more">Ещё</button>
    </section>
  );
}

export default MoviesCardList;