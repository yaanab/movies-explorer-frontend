import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies({ handleMovieDelete, cards }) {
  return (
    <main className="saved-movies__content">
      <SearchForm />
      <MoviesCardList
        handleMovieDelete={handleMovieDelete}
        cards={cards}
        isMovieFounded={false}
        isMovieJS={false}
        isError={isError}
      />
    </main>
  );
}

export default SavedMovies;