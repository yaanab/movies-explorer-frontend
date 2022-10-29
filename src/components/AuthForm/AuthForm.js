import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';

function AuthForm({ title, onSubmit, children, isServerResponse200, isValid, button, isLoading, text, link, linkText }) {


  return (
    <div className="auth-form">
      <Link to="/">
        <img src={logo} alt="Логотип" className="auth-form__logo" />
      </Link>
      <h2 className="auth-form__title">{title}</h2>
      <form className="auth-form__form" onSubmit={onSubmit}>
        <div className="auth-form__inputs">
          {children}
          {/* <div className={auth-form__input-group}>
            <label className="auth-form__label" htmlFor="name">Имя</label>
            <input className="auth-form__input" onChange={handleChange} value={values.name || ""} type="text" id="name" name="name" minLength="4" maxLength="30" required />
            <span className={`auth-form__error ${(!isValid) && "auth-form__error_block"}`}>{errors.name}</span>
          </div>
          <div className="auth-form__input-group">
            <label className="auth-form__label" htmlFor="email">E-mail</label>
            <input className="auth-form__input" onChange={handleChange} value={values.email || ""} type="email" id="email" name="email" required />
            <span className={`auth-form__error ${(!isValid) && "auth-form__error_block"}`}>{errors.email}</span>
          </div>
          <div className="auth-form__input-group">
            <label className="auth-form__label" htmlFor="password">Пароль</label>
            <input className="auth-form__input" onChange={handleChange} value={values.password || ""} type="password" id="password" name="password" minLength="4" required />
            <span className={`auth-form__error ${(!isValid) && "auth-form__error_block"}`}>{errors.password}</span>
          </div> */}
        </div>
        <div className="auth-form__button-area">
          <span className={`auth-form__server-error ${(!isServerResponse200) && "auth-form__server-error_block"}`}>"a вот здесь у нас ошибка"</span>
          <button type="submit" className={`auth-form__submit-btn ${(!isValid || isLoading) && "auth-form__submit-btn_disabled"}`} disabled={!isValid}>{button}</button>
        </div>
      </form>
      <div className="auth-form__link-block">
        <p className="auth-form__text">{text}</p>
        <Link to={link} className="auth-form__link">{linkText}</Link>
      </div>
    </div>
  );
}

export default AuthForm;