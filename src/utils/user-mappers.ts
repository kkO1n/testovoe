import type { EditableUser, UserApi, UserCardModel } from '../types/user';
import { getAvatarById } from './avatar';

export const mapApiToEditable = (user: UserApi): EditableUser => ({
  name: user.name,
  username: user.username,
  email: user.email,
  city: user.address.city,
  phone: user.phone,
  companyName: user.company.name,
  avatarUrl: getAvatarById(user.id),
});

export const mergeEditable = (
  user: UserApi,
  patch?: Partial<EditableUser>,
): EditableUser => ({
  ...mapApiToEditable(user),
  ...patch,
});

export const toCardModel = (
  user: UserApi,
  patch: Partial<EditableUser> | undefined,
  archived: boolean,
): UserCardModel => {
  const merged = mergeEditable(user, patch);

  return {
    id: user.id,
    username: merged.username,
    city: merged.city,
    companyName: merged.companyName,
    avatarUrl: merged.avatarUrl,
    archived,
  };
};
