function Footer() {
  return (
    <section className="footer__content">
      <h4 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h4>
      <div className="footer__info">
        <p className="footer__copyright">&copy;{new Date().getFullYear()}</p>
        <nav>
          <ul className="footer__links">
            <li>
              <a target="_blank" rel="noreferrer" href="https://practicum.yandex.ru" className="footer__link">
                Яндекс.Практикум
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="https://github.com/yaanab" className="footer__link">
                Github
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Footer;