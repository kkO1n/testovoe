import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../api/users';
import { Loader } from '../components/Loader';
import { UserCard } from '../components/UserCard';
import { useUsersStore } from '../store/useUsersStore';
import { toCardModel } from '../utils/user-mappers';

export const HomePage = () => {
  const navigate = useNavigate();

  const archivedIds = useUsersStore((state) => state.archivedIds);
  const hiddenIds = useUsersStore((state) => state.hiddenIds);
  const editsById = useUsersStore((state) => state.editsById);
  const archiveUser = useUsersStore((state) => state.archiveUser);
  const unarchiveUser = useUsersStore((state) => state.unarchiveUser);
  const hideUser = useUsersStore((state) => state.hideUser);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isPending) {
    return <Loader message="Загрузка пользователей..." />;
  }

  if (isError) {
    return <p className="feedback feedback--error">{error.message}</p>;
  }

  const visibleUsers = (data ?? []).filter((user) => !hiddenIds.includes(user.id));

  const activeUsers = visibleUsers
    .filter((user) => !archivedIds.includes(user.id))
    .map((user) => toCardModel(user, editsById[user.id], false));

  const archivedUsers = visibleUsers
    .filter((user) => archivedIds.includes(user.id))
    .map((user) => toCardModel(user, editsById[user.id], true));

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
