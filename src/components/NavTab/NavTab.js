import AnchorLink from 'react-anchor-link-smooth-scroll';

function NavTab() {
  return (
    <section className="nav-tab__content">
      <nav className="nav-tab__navigation">
        <AnchorLink href="#about-project" className="nav-tab__link">О проекте</AnchorLink>
        <AnchorLink href="#techs" className="nav-tab__link">Технологии</AnchorLink>
        <AnchorLink href="#about-me" className="nav-tab__link">Студент</AnchorLink>
      </nav>
    </section>
  );
}

export default NavTab;