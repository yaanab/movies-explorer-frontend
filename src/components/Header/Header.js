import { Link, withRouter } from 'react-router-dom';
import logo from '../../images/header-logo.svg';
import menuIcon from '../../images/menu-icon.svg';
import Navigation from '../Navigation/Navigation';

function Header({ 
  isNavPopupOpen, 
  setIsNavPopupOpen, 
  onNavMenuClick, 
  onNavPopupClose, 
  isLoggedIn 
}) {
  function stopPropagation(e) {
    e.stopPropagation();
  }

  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__logo-link">
          <img src={logo} alt="Логотип" className="header__logo" />
        </Link>
        {!isLoggedIn &&
          <div className="header__authorization">
            <Link to="signup" className="header__auth-link">
              Регистрация
            </Link>
            <Link to="signin" className="header__login-link">
              Войти
            </Link>
          </div>
        }
        {isLoggedIn &&
          <>
            <div className="header__open-nav">
              <Navigation
                isNavPopupOpen={isNavPopupOpen}
                setIsNavPopupOpen={setIsNavPopupOpen}
              />
            </div>
            <button type="button" className="header__nav-menu" onClick={onNavMenuClick}>
              <img src={menuIcon} alt="Кнопка открытия меню навигации" className="header__nav-menu-img" />
            </button>
            <div onClick={onNavPopupClose} className={`header__nav-popup ${isNavPopupOpen && "header__nav-popup_opened"}`}>
              <div onClick={stopPropagation} className="header__nav-popup-container">
                <Navigation
                  isNavPopupOpen={isNavPopupOpen}
                  setIsNavPopupOpen={setIsNavPopupOpen}
                />
                <button onClick={onNavPopupClose} aria-label="Закрыть" type="button" className="header__nav-popup-close-btn"></button>
              </div>
            </div>
          </>
        }
      </div>
    </header>
  );
}

export default withRouter(Header);