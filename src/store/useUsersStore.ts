import { create } from 'zustand';
import type { EditableUser } from '../types/user';

interface UsersState {
  archivedIds: number[];
  hiddenIds: number[];
  editsById: Record<number, EditableUser>;
  archiveUser: (id: number) => void;
  unarchiveUser: (id: number) => void;
  hideUser: (id: number) => void;
  saveUserEdits: (id: number, payload: EditableUser) => void;
  resetLocalState: () => void;
}

const addUnique = (list: number[], id: number): number[] =>
  list.includes(id) ? list : [...list, id];

export const useUsersStore = create<UsersState>((set) => ({
  archivedIds: [],
  hiddenIds: [],
  editsById: {},
  archiveUser: (id) =>
    set((state) => ({
      archivedIds: addUnique(state.archivedIds, id),
    })),
  unarchiveUser: (id) =>
    set((state) => ({
      archivedIds: state.archivedIds.filter((item) => item !== id),
    })),
  hideUser: (id) =>
    set((state) => ({
      hiddenIds: addUnique(state.hiddenIds, id),
      archivedIds: state.archivedIds.filter((item) => item !== id),
    })),
  saveUserEdits: (id, payload) =>
    set((state) => ({
      editsById: {
        ...state.editsById,
        [id]: payload,
      },
    })),
  resetLocalState: () =>
    set({
      archivedIds: [],
      hiddenIds: [],
      editsById: {},
    }),
}));
