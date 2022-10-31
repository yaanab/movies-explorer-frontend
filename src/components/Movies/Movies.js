import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../PreLoader/Preloader";

function Movies({ isLoading, onSearchMovies, isCheckboxChecked, cards, isButtonClicked, isFilmSaved }) {
  return (
    <main className="movies__content">
      <SearchForm 
      onSearchMovies={onSearchMovies}
      isCheckboxChecked={isCheckboxChecked}
      />
      {!isLoading &&
        <MoviesCardList
          cards={cards}
          isFilmSaved={isFilmSaved}
          isButtonClicked={isButtonClicked}
        />
      }
      {isLoading &&
        <Preloader />
      }
    </main>
  );
}

export default Movies;