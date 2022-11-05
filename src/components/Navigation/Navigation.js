import { Link, NavLink } from 'react-router-dom';
import profileIcon from '../../images/header-profile-icon.svg';

function Navigation({ 
  isNavPopupOpen, 
  setIsNavPopupOpen 
}) {
  function closeNavPopup() {
    setIsNavPopupOpen(false);
  }

  return (
    <nav className="navigation__content">
      <div className="navigation__movies-links">
        {isNavPopupOpen &&
          <NavLink exact to="/" onClick={closeNavPopup} activeClassName="navigation__movies-link_active" className="navigation__movies-link">
            Главная
          </NavLink>
        }
        <NavLink to="movies" onClick={closeNavPopup} activeClassName="navigation__movies-link_active" className="navigation__movies-link">
          Фильмы
        </NavLink>
        <NavLink to="saved-movies" onClick={closeNavPopup} activeClassName="navigation__movies-link_active" className="navigation__movies-link">
          Сохраненные фильмы
        </NavLink>
      </div>
      <Link to="profile" onClick={closeNavPopup} className="navigation__profile">
        <img src={profileIcon} alt="Контур человека до плеч" className="navigation__profile-icon" />
        <h2 className="navigation__profile-text">Аккаунт</h2>
      </Link>
    </nav>
  );
}

export default Navigation;