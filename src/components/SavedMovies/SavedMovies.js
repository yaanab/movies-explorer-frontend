import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ cards, isFilmSaved }) {
  return (
    <main className="saved-movies__content">
      <SearchForm />
      <MoviesCardList
        cards={cards}
        isMovieFounded={false}
        // isFilmSaved={isFilmSaved}
      />
    </main>
  );
}

export default SavedMovies;