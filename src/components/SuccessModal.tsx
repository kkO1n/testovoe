import { useEffect } from 'react';
import successCheckIcon from '../assets/icons/success-check-icon.png';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const timer = window.setTimeout(onClose, 4000);
    return () => window.clearTimeout(timer);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="success-modal"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="success-modal__card" role="dialog" aria-modal="true" aria-label="Изменения сохранены">
        <button className="success-modal__close" type="button" onClick={onClose} aria-label="Закрыть">
          ×
        </button>
        <div className="success-modal__icon" aria-hidden="true">
          <img className="success-modal__icon-image" src={successCheckIcon} alt="" />
        </div>
        <p className="success-modal__text">Изменения сохранены!</p>
      </div>
    </div>
  );
};
