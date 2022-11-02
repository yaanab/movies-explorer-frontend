import saveButtonInactive from "../../images/save-btn.svg";
import saveButtonActive from "../../images/save-btn-active.svg";
import deleteButton from "../../images/film-delete-btn.svg";

function MoviesCard({ card, onMovieSave, isMovieFounded, isMovieSaved }) {

  const buttonImage = (isMovieSaved ? saveButtonActive : saveButtonInactive);

  // function handleMovieSave() {
  //   onMovieSave(card);
  // }

  return (
    <article className="movies-card">
      <div className="movies-card__info">
        <div className="movies-card__descriprion">
          <h2 className="movies-card__title">{card.nameRU}</h2>
          <p className="movies-card__duration">{`${Math.floor(card.duration / 60)}ч ${card.duration % 60}м`}</p>
        </div>
        {isMovieFounded &&
          <button aria-label="Сохранить фильм" type="button" className="movies-card__button">
            <img className="movies-card__button-img" src={buttonImage} alt="Cохранить фильм" />
          </button>
        }
        {!isMovieFounded &&
          <button aria-label="Сохранить фильм" type="button" className="movies-card__button">
            <img className="movies-card__button-img" src={deleteButton} alt="Удалить  фильм" />
          </button>
        }
      </div>
      <a href={card.trailerLink} target="_blank" rel="noreferrer" className="movies-card__trailer">
        <img className="movies-card__image" src={`https://api.nomoreparties.co${card.image.url}`} alt={card.nameRU} />
      </a>
    </article>
  );
}

export default MoviesCard;