import { Link } from 'react-router-dom';

export const AppHeader = () => {
  return (
    <header className="header">
      <div className="header__container container">
        <Link className="logo" to="/" aria-label="На главную">
          <span className="logo__icon">a</span>
          <span className="logo__text">
            <span className="logo__text-light">at-</span>
            <span className="logo__text-strong">work</span>
          </span>
        </Link>

        <div className="header__actions">
          <button className="header__icon-button" type="button" aria-label="Избранное">
            ♡
          </button>
          <button className="header__icon-button" type="button" aria-label="Уведомления">
            ◌
          </button>
          <div className="header__profile">
            <img
              className="header__avatar"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
              alt="Иван"
            />
            <span className="header__name">Ivan1234</span>
          </div>
        </div>
      </div>
    </header>
  );
};
