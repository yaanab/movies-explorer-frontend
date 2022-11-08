import React from "react";
import PreloaderButton from "../PreloaderButton/PreloaderButton";
import deleteButton from "../../images/film-delete-btn.svg";
import { useEffect, useState } from "react";

function MoviesCard({
  card,
  isMovieJS,
  handleMovieDelete,
  savedMovies,
  isLoadingCardSave,
  handleMovieSave,
}) {
  const [buttonImage, setButtonImage] = useState("");
  const [duration, setDuration] = useState("");
  const [cardImage, setCardImage] = useState("");
  const [title, setTitle] = useState("");
  const isSaved = savedMovies.some((savedMovie) => savedMovie.movieId === card.id);

  useEffect(() => {
    setTitle(card.nameRU);
    const duration = card.duration >= 60 ? `${Math.floor(card.duration / 60)}ч ${card.duration % 60}м` : `${card.duration} м`;
    setDuration(duration);
    const cardImage = (card.image.url ? (`https://api.nomoreparties.co${card.image.url}`) : card.image);
    setCardImage(cardImage);
    setButtonImage(`movies-card__button ${isSaved && 'movies-card__button_active'}`);
  }, []);

  function onClick(card) {
    if (isSaved) {
      handleMovieDelete(card);
    } else {
      handleMovieSave(card);
    }
  }

  return (
    <article className="movies-card">
      <div className="movies-card__info">
        <div className="movies-card__descriprion">
          <h2 className="movies-card__title">{title}</h2>
          <p className="movies-card__duration">{duration}</p>
        </div>
        {isLoadingCardSave &&
          <button aria-label="Сохранение, удаление фильма" type="button" className="movies-card__button">
            <PreloaderButton />
          </button>
        }
        {!isLoadingCardSave && isMovieJS &&
          <button onClick={() => onClick(card)} className={buttonImage} aria-label="Сохранение, удаление фильма" type="button">
          </button>
        }
        {!isLoadingCardSave && !isMovieJS &&
          <button onClick={() => handleMovieDelete(card)} aria-label="Удаление фильма" type="button" className="movies-card__button">
            <img className="movies-card__button-img" src={deleteButton} alt="Удалить фильм" />
          </button>
        }
      </div>
      <a href={card.trailerLink} target="_blank" rel="noreferrer" className="movies-card__trailer">
        <img className="movies-card__image" src={cardImage} alt={title} />
      </a>
    </article>
  );
}

export default MoviesCard;