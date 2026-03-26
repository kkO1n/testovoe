import { useUsersStore } from '../../../store/useUsersStore';

export const useUsersActions = () => {
  const archiveUser = useUsersStore((state) => state.archiveUser);
  const unarchiveUser = useUsersStore((state) => state.unarchiveUser);
  const hideUser = useUsersStore((state) => state.hideUser);

  return {
    archiveUser,
    unarchiveUser,
    hideUser,
  };
};
