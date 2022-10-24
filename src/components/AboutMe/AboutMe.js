import photo from '../../images/about-me-photo.png';

function AboutMe() {
  return (
    <section id="about-me" className="about-me__content">
      <h2 className="about-me__title">
        Студент
      </h2>
      <article className="about-me__description">
        <div className="about-me__text">
          <div className="about-me__text-block">
            <h3 className="about-me__name">
              Виталий
            </h3>
            <p className="about-me__profession">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__experience">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
          </div>
          <a target="_blank" rel="noreferrer" href="https://github.com/yaanab" className="about-me__git-link">
            Github
          </a>
        </div>
        <img src={photo} alt="фото" className="about-me__photo" />
      </article>

    </section>
  );
}

export default AboutMe;