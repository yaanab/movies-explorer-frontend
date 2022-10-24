function AboutProject() {
  return (
    <section id="about-project" className="about-project__content">
      <h2 className="about-project__title">
        О проекте
      </h2>
      <article className='about-project__article'>
        <h2 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h2>
        <p className='about-project__text'>
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
        </p>
        <h2 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h2>
        <p className='about-project__text'>
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
        </p>
      </article>
      <article className='about-project__duration'>
        <h3 className='about-project__weeks about-project__weeks_background_backend'>1 неделя</h3>
        <p className='about-project__type'>
          Back-end
        </p>
        <h3 className='about-project__weeks about-project__weeks_background_frontend'>4 недели</h3>
        <p className='about-project__type'>
          Front-end
        </p>
      </article>
    </section>
  );
}

export default AboutProject;