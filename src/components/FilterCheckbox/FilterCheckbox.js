function FilterCheckbox({ label }) {
  return (
    <div className="filter__content">
      <input type="checkbox" id='checkbox' className='filter__checkbox' />
      <label htmlFor="checkbox" className='filter__checkbox-label'>{label}</label>
    </div>
  )
}

export default FilterCheckbox;