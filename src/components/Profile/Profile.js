import { useContext, useEffect } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/useForm';

function Profile({
  isEditProfile,
  handleEditProfile,
  emailPattern,
  namePattern,
  onUpdateUser,
  isSendingUserDataToServer,
  isServerError,
  serverErrorMessage,
  inputValidationMessageDefault,
  inputValidationMessageName,
  inputValidationMessageEmail
}) {

  const currentUser = useContext(CurrentUserContext);
  const { values, setValues, handleChange, errors, isValid } = useFormWithValidation({});

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email
    })
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values.name, values.email);
  }

  return (
    <main className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form onSubmit={handleSubmit} className="profile__form">
        <div className="profile__inputs">
          <div className="profile__input-group profile__input-group_underlined">
            <label className="profile__label" htmlFor="name">Имя</label>
            <input onChange={handleChange} className="profile__input" type="text" pattern={namePattern} id="name" name="name" placeholder="Имя" value={values.name || ""} required readOnly={!isEditProfile}  minLength="2" maxLength="30" autoComplete="on" />
            
          </div>
          <div className="profile__input-group">
            <label className="profile__label" htmlFor="email">E-mail</label>
            <input onChange={handleChange} className="profile__input" type="email" pattern={emailPattern} id="email" name="email" placeholder="E-mail" value={values.email || ""} required readOnly={!isEditProfile} autoComplete="on" />
          </div>
          <span className={`profile__error ${(!isValid) && "profile__error_block"}`}>
            {errors.name === inputValidationMessageDefault ? inputValidationMessageName : errors.name}
          </span>
          <span className={`profile__error ${(!isValid) && "profile__error_block"}`}>
            {errors.email === inputValidationMessageDefault ? inputValidationMessageEmail : errors.email}
          </span>
        </div>
        {!isEditProfile && (
          <div className="profile__buttons-area">
            <button type="button" onClick={handleEditProfile} className="profile__button profile__button_type_edit">
              Редактировать
            </button>
            <button type="button" className="profile__button profile__button_type_logout">
              Выйти из аккаунта
            </button>
          </div>
        )}
        {isEditProfile && (
          <div className="profile__buttons-area_type_update">
            <span className={`profile__update-error ${(isServerError) && "profile__update-error_block"}`}>{serverErrorMessage}</span>
            <button type="submit" className={`profile__button_type_update ${(!isValid || isSendingUserDataToServer ) && "profile__button_disabled"}`} disabled={!isValid}>
              {!isSendingUserDataToServer ? "Сохранить" : "Cохранение..."}
            </button>
          </div>
        )}
      </form>
    </main>
  );
}

export default Profile;