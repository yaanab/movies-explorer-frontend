import React, { useEffect } from 'react';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormWithValidation } from '../../hooks/useForm';
import findButton from '../../images/find-button.svg';

function SearchForm({ onSearchMovies, onCheckboxCheck, isCheckboxChecked, searchWord }) {

  const { values, setValues, handleChange } = useFormWithValidation({});

  useEffect(() => {
    setValues({
      nameRU: searchWord
    })
  }, [searchWord]);

  function onSubmit(e) {
    e.preventDefault();
    onSearchMovies(values.nameRU);
  }

  return (
    <section className="search__content">
      <form onSubmit={onSubmit} className="search__form">
        <div className="search__input-area">
          <input type="text" onChange={handleChange} value={values.nameRU || ""} className="search__form-input" placeholder="Фильм" name="nameRU" minLength="1" required />
          <button type="submit" className="search__form-button">
            <img className="search__form-button-img" src={findButton} alt="найти" />
          </button>
        </div>
        <div className="search__filter-area">
          <FilterCheckbox
            label="Короткометражки"
            onCheckboxCheck={onCheckboxCheck}
            isCheckboxChecked={isCheckboxChecked}
          />
        </div>
      </form >
    </section>
  );
}

export default SearchForm;