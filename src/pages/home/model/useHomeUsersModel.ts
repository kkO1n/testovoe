import { useMemo } from 'react';
import { useUsersStore } from '../../../store/useUsersStore';
import type { UserApi } from '../../../types/user';
import { toCardModel } from '../../../utils/user-mappers';

export const useHomeUsersModel = (users: UserApi[] | undefined) => {
  const archivedIds = useUsersStore((state) => state.archivedIds);
  const hiddenIds = useUsersStore((state) => state.hiddenIds);
  const editsById = useUsersStore((state) => state.editsById);

  return useMemo(() => {
    const visibleUsers = (users ?? []).filter((user) => !hiddenIds.includes(user.id));

    const activeUsers = visibleUsers
      .filter((user) => !archivedIds.includes(user.id))
      .map((user) => toCardModel(user, editsById[user.id], false));

    const archivedUsers = visibleUsers
      .filter((user) => archivedIds.includes(user.id))
      .map((user) => toCardModel(user, editsById[user.id], true));

    return {
      activeUsers,
      archivedUsers,
    };
  }, [archivedIds, editsById, hiddenIds, users]);
};
