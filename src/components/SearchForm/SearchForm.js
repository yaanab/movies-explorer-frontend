import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormWithValidation } from '../../hooks/useForm';
import findButton from '../../images/find-button.svg';

function SearchForm() {

  const { values, handleChange, errors, isValid } = useFormWithValidation({});

  function handleSubmit(e) {
    e.preventDefault();
    // onLogin(values.email, values.password);
  }

  return (
    <section className="search__content">
      <form onSubmit={handleSubmit} className="search__form">
        <div className="search__input-area">
          <input type="text" onChange={handleChange} value={values.nameRU || ""} className="search__form-input" placeholder="Фильм" name="nameRU" minLength="1" required />
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