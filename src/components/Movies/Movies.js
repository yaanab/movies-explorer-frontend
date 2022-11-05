import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../PreLoader/Preloader";

function Movies({ 
  handleMovieButtonClick, 
  isCheckboxChecked, 
  handleSearchMovies, 
  onCheckboxCheck, 
  searchWord, 
  renderedCards,
  isLoading,
  isError
 }) {

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
          isLoading={isLoading}
          isMovieJS={true}
          isError={isError}
          handleMovieButtonClick={handleMovieButtonClick}
        />
      }
      {isLoading &&
        <Preloader />
      }
    </main>
  );
}

export default Movies;