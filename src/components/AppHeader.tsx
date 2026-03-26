import { Link } from 'react-router-dom';
import favoriteIcon from '../assets/icons/ic_baseline-favorite-border.png';
import logoSignIcon from '../assets/icons/logo-sign.png';
import notificationIcon from '../assets/icons/mi_notification.png';
import styles from './AppHeader.module.scss';

export const AppHeader = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link className={styles.logo} to="/" aria-label="На главную">
          <span className={styles.logoIcon} aria-hidden="true">
            <img className={styles.logoIconImage} src={logoSignIcon} alt="" />
          </span>
          <span className={styles.logoText}>
            <span className={styles.logoTextLight}>at-</span>
            <span className={styles.logoTextStrong}>work</span>
          </span>
        </Link>

        <div className={styles.actions}>
          <button className={styles.iconButton} type="button" aria-label="Избранное">
            <img className={styles.iconImage} src={favoriteIcon} alt="" aria-hidden="true" />
          </button>
          <button className={styles.iconButton} type="button" aria-label="Уведомления">
            <img className={styles.iconImage} src={notificationIcon} alt="" aria-hidden="true" />
          </button>
          <div className={styles.profile}>
            <img
              className={styles.avatar}
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
              alt="Иван"
            />
            <span className={styles.name}>Ivan1234</span>
          </div>
        </div>
      </div>
    </header>
  );
};
