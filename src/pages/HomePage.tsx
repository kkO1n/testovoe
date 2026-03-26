import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { UserCard } from "../components/UserCard";
import styles from "./HomePage.module.scss";
import { useHomeUsersModel } from "./home/model/useHomeUsersModel";
import { useUsersActions } from "./home/model/useUsersActions";
import { useUsersQuery } from "./home/model/useUsersQuery";

export const HomePage = () => {
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useUsersQuery();
  const { archiveUser, unarchiveUser, hideUser } = useUsersActions();

  const { activeUsers, archivedUsers } = useHomeUsersModel(data);

  if (isPending) {
    return <Loader message="Загрузка пользователей..." />;
  }

  if (isError) {
    return <p className="feedback feedback--error">{error.message}</p>;
  }

  return (
    <div className={`container ${styles.home}`}>
      <section className={styles.section}>
        <div className={styles.titleWrap}>
          <h1 className={styles.title}>Активные</h1>
        </div>

        {activeUsers.length > 0 ? (
          <div className={styles.cards}>
            {activeUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={(id) => navigate(`/users/${id}/edit`)}
                onArchive={archiveUser}
                onActivate={unarchiveUser}
                onHide={hideUser}
              />
            ))}
          </div>
        ) : (
          <p className="feedback">Нет активных пользователей</p>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.titleWrap}>
          <h2 className={styles.title}>Архив</h2>
        </div>

        {archivedUsers.length > 0 ? (
          <div className={`${styles.cards} ${styles.cardsArchive}`}>
            {archivedUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={(id) => navigate(`/users/${id}/edit`)}
                onArchive={archiveUser}
                onActivate={unarchiveUser}
                onHide={hideUser}
              />
            ))}
          </div>
        ) : (
          <p className="feedback">Архив пуст</p>
        )}
      </section>
    </div>
  );
};
