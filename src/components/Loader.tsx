import styles from './Loader.module.scss';

interface LoaderProps {
  message?: string;
}

export const Loader = ({ message = 'Загрузка...' }: LoaderProps) => {
  return (
    <div className={styles.loader} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
};
