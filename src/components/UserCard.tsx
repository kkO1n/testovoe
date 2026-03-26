import { useEffect, useRef, useState } from "react";
import type { UserCardModel } from "../types/user";

interface UserCardProps {
  user: UserCardModel;
  onEdit: (id: number) => void;
  onArchive: (id: number) => void;
  onActivate: (id: number) => void;
  onHide: (id: number) => void;
}

export const UserCard = ({
  user,
  onEdit,
  onArchive,
  onActivate,
  onHide,
}: UserCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onWindowClick = (event: MouseEvent) => {
      if (!menuRef.current) {
        return;
      }

      if (!menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("click", onWindowClick);
    return () => window.removeEventListener("click", onWindowClick);
  }, []);

  const isArchived = user.archived;

  return (
    <article className={`user-card ${isArchived ? "user-card--archived" : ""}`}>
      <img
        className="user-card__avatar"
        src={user.avatarUrl}
        alt={user.username}
      />

      <div className="user-card__content">
        <div>
          <div className="user-card__head">
            <h3 className="user-card__username">{user.username}</h3>

            <div className="user-card__menu" ref={menuRef}>
              <button
                type="button"
                className="user-card__menu-trigger"
                aria-expanded={isMenuOpen}
                aria-label="Открыть меню действий"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsMenuOpen((prev) => !prev);
                }}
              >
                <span />
                <span />
                <span />
              </button>

              {isMenuOpen && (
                <div className="user-card__menu-list">
                  <button
                    type="button"
                    onClick={() => {
                      onEdit(user.id);
                      setIsMenuOpen(false);
                    }}
                  >
                    Редактировать
                  </button>

                  {isArchived ? (
                    <button
                      type="button"
                      onClick={() => {
                        onActivate(user.id);
                        setIsMenuOpen(false);
                      }}
                    >
                      Сделать активным
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        onArchive(user.id);
                        setIsMenuOpen(false);
                      }}
                    >
                      Архивировать
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      onHide(user.id);
                      setIsMenuOpen(false);
                    }}
                  >
                    Скрыть
                  </button>
                </div>
              )}
            </div>
          </div>

          <p className="user-card__company">{user.companyName}</p>
        </div>

        <p className="user-card__city">{user.city}</p>
      </div>
    </article>
  );
};
