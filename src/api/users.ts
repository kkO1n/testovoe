import type { UserApi } from '../types/user';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async (): Promise<UserApi[]> => {
  const response = await fetch(`${API_URL}/users`);

  if (!response.ok) {
    throw new Error('Не удалось загрузить список пользователей');
  }

  const data = (await response.json()) as UserApi[];
  return data.slice(0, 6);
};

export const fetchUserById = async (userId: number): Promise<UserApi> => {
  const response = await fetch(`${API_URL}/users/${userId}`);

  if (!response.ok) {
    throw new Error('Не удалось загрузить пользователя');
  }

  return (await response.json()) as UserApi;
};
