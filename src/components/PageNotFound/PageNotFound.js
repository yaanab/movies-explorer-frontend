import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <main className="page-not-found">
      <h2 className="page-not-found__error-number">
        404
      </h2>
      <p className="page-not-found__error-text">
        Страница не найдена
      </p>
      <Link to="/" className="page-not-found__link">
        Назад
      </Link>
    </main>
  );
}

export default PageNotFound;