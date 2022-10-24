import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import findButton from '../../images/find-button.png';

function SearchForm() {
  return (
    <section className="search__content">
      <form className="search__form">
        <div className="search__input-area">
          <input type="text" className="search__form-input" placeholder="Фильм" />
          <button type="submit" className="search__form-button">
            <img className="search__form-button-img" src={findButton} alt="найти" />
          </button>
        </div>
        <div className="search__filter-area">
          <FilterCheckbox
            label="Короткометражки"
          />
        </div>
      </form >
    </section>
  );
}

export default SearchForm;