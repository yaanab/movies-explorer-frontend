function FilterCheckbox({ label, onCheckboxCheck, isCheckboxChecked }) {
  return (
    <div className="filter__content">
      <input type="checkbox" onChange={onCheckboxCheck} defaultChecked={isCheckboxChecked} id='checkbox' className='filter__checkbox' />
      <label htmlFor="checkbox" className='filter__checkbox-label'>{label}</label>
    </div>
  )
}

export default FilterCheckbox;