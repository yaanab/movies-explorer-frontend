import { useContext, useState } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Profile() {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("Виталий");
  const [email, setEmai] = useState("pochta@yandex.ru");
  const [isEdit, setIsEdit] = useState(false);
  const [isValid, setIsValid] = useState(false);

  return (
    <main className="profile">
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <form className="profile__form">
        <div className="profile__inputs">
          <div className="profile__input-group profile__input-group_underlined">
            <label className="profile__label" htmlFor="name">Имя</label>
            <input className="profile__input" type="text" id="name" name="name" placeholder="Имя" value={currentUser.name || ""} required readOnly={!isEdit} autoComplete="on" />
          </div>
          <div className="profile__input-group">
            <label className="profile__label" htmlFor="email">E-mail</label>
            <input className="profile__input" type="email" id="email" name="email" placeholder="E-mail" value={currentUser.email || ""} required readOnly={!isEdit} autoComplete="on" />
          </div>
        </div>
        {!isEdit && (
          <div className="profile__buttons-area">
            <button type="button" className="profile__button profile__button_type_edit">
              Редактировать
            </button>
            <button type="button" className="profile__button profile__button_type_logout">
              Выйти из аккаунта
            </button>
          </div>
        )}
        {isEdit && (
          <div className="profile__buttons-area_type_update">
            <span className="profile__update-error">При обновлении профиля произошла ошибка.</span>
            <button type="submit" className={`profile__button_type_update ${(!isValid) && "profile__button_disabled"}`} disabled={!isValid}>
              Сохранить
            </button>
          </div>
        )}
      </form>
    </main>
  );
}

export default Profile;