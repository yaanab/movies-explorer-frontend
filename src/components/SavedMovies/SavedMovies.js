import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ cards, isFilmSaved }) {
  return (
    <section className="saved-movies__content">
      <SearchForm />
      <MoviesCardList
        cards={cards}
        isFilmSaved={isFilmSaved}
      />
    </section>
  );
}

export default SavedMovies;