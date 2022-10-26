import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../PreLoader/Preloader";

function Movies({ cards, isLoading, isButtonClicked, isFilmSaved }) {
  return (
    <main className="movies__content">
      <SearchForm />
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