interface LoaderProps {
  message?: string;
}

export const Loader = ({ message = 'Загрузка...' }: LoaderProps) => {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__spinner" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
};
