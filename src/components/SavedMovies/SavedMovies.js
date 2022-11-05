import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../PreLoader/Preloader";

function SavedMovies({
  handleMovieDelete,
  isError,
  handleSearchMovies,
  isCheckboxChecked,
  onCheckboxCheck,
  isLoading,
  renderedCards,
  searchWord
}) {
  return (
    <main className="saved-movies__content">
      <SearchForm
        isCheckboxChecked={isCheckboxChecked}
        onSearchMovies={handleSearchMovies}
        onCheckboxCheck={onCheckboxCheck}
        searchWord={searchWord}
      />
      <MoviesCardList
        cards={renderedCards}
        isLoading={isLoading}
        isMovieJS={false}
        handleMovieDelete={handleMovieDelete}
        isError={isError}
      />
      {isLoading &&
        <Preloader />
      }
    </main>
  );
}

export default SavedMovies;