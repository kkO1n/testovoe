import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { UserCard } from "../components/UserCard";
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
    <div className="home container">
      <section className="home__section">
        <div className="home__title-wrap">
          <h1 className="home__title">Активные</h1>
        </div>

        {activeUsers.length > 0 ? (
          <div className="home__cards">
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

      <section className="home__section home__section--archive">
        <div className="home__title-wrap">
          <h2 className="home__title">Архив</h2>
        </div>

        {archivedUsers.length > 0 ? (
          <div className="home__cards home__cards--archive">
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
