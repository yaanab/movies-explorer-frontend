function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">
        Портфолио
      </h3>
      <nav>
        <ul className="portfolio__links">
          <li>
            <a className="portfolio__link portfolio__link_underlined" target="_blank" rel="noreferrer" href="https://github.com/yaanab/how-to-learn">
              Статичный сайт
            </a>
          </li>
          <li>
            <a className="portfolio__link portfolio__link_underlined" target="_blank" rel="noreferrer" href="https://yaanab.github.io/russian-travel/index.html">
              Адаптивный сайт
            </a>
          </li>
          <li>
            <a className="portfolio__link" target="_blank" rel="noreferrer" href="https://yaana.nomoredomains.sbs">
              Одностраничное приложение
            </a>
          </li>
        </ul>
      </nav>
    </section>
  );
}

export default Portfolio;