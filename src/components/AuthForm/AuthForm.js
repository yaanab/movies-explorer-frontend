import { Link } from 'react-router-dom';
import logo from '../../images/header-logo.svg';

function AuthForm({ title, onSubmit, children, isServerError, isValid, button, isLoading, serverErrorMessage, text, link, linkText }) {


  return (
    <div className="auth-form">
      <Link to="/">
        <img src={logo} alt="Логотип" className="auth-form__logo" />
      </Link>
      <h2 className="auth-form__title">{title}</h2>
      <form className="auth-form__form" onSubmit={onSubmit}>
        <div className="auth-form__inputs">
          {children}
        </div>
        <div className="auth-form__button-area">
          <span className={`auth-form__server-error ${(isServerError) && "auth-form__server-error_block"}`}>{serverErrorMessage}</span>
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