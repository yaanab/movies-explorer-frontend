import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';

function AuthForm({ title, isNameHidden, button, text, link, linkText }) {
  return (
    <div className="auth-form">
      <Link to="/">
        <img src={logo} alt="Логотип" className="auth-form__logo" />
      </Link>
      <h2 className="auth-form__title">{title}</h2>
      <form className="auth-form__form">
        <div className="auth-form__inputs">
          <div className={`auth-form__input-group ${(isNameHidden) && "auth-form__input-group_block"}`}>
            <label className="auth-form__label" htmlFor="name">Имя</label>
            <input className="auth-form__input" type="text" id="name" name="name" required />
          </div>
          <div className="auth-form__input-group">
            <label className="auth-form__label" htmlFor="email">E-mail</label>
            <input className="auth-form__input" type="email" id="email" name="email" required />
          </div>
          <div className="auth-form__input-group">
            <label className="auth-form__label" htmlFor="password">Пароль</label>
            <input className="auth-form__input" type="password" id="password" name="password" required />
            <span className="auth-form__error">Что-то пошло не так...</span>
          </div>
        </div>
        <button type="submit" className="auth-form__submit-btn">{button}</button>
      </form>
      <div className="auth-form__link-block">
        <p className="auth-form__text">{text}</p>
        <Link to={link} className="auth-form__link">{linkText}</Link>
      </div>
    </div>
  );
}

export default AuthForm;