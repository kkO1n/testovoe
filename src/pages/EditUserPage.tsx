import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { z } from 'zod';
import { fetchUserById } from '../api/users';
import { Loader } from '../components/Loader';
import { SuccessModal } from '../components/SuccessModal';
import { useUsersStore } from '../store/useUsersStore';
import type { UserApi } from '../types/user';
import { mergeEditable } from '../utils/user-mappers';

const userSchema = z.object({
  name: z.string().trim().min(2, 'Имя должно быть не короче 2 символов').max(64, 'Максимум 64 символа'),
  username: z
    .string()
    .trim()
    .min(2, 'Никнейм должен быть не короче 2 символов')
    .max(64, 'Максимум 64 символа'),
  email: z.string().trim().email('Введите корректную почту'),
  city: z.string().trim().min(2, 'Город должен быть не короче 2 символов').max(64, 'Максимум 64 символа'),
  phone: z
    .string()
    .trim()
    .min(1, 'Телефон обязателен')
    .refine((value) => /\d/.test(value), 'Телефон должен содержать цифры'),
  companyName: z
    .string()
    .trim()
    .min(2, 'Название компании должно быть не короче 2 символов')
    .max(64, 'Максимум 64 символа'),
  avatarUrl: z.string().trim().url('Введите корректный URL аватара'),
});

type UserFormData = z.infer<typeof userSchema>;

const emptyForm: UserFormData = {
  name: '',
  username: '',
  email: '',
  city: '',
  phone: '',
  companyName: '',
  avatarUrl: '',
};

export const EditUserPage = () => {
  const params = useParams<{ userId: string }>();
  const queryClient = useQueryClient();
  const userId = Number(params.userId);
  const isValidId = Number.isInteger(userId) && userId > 0;

  const editsById = useUsersStore((state) => state.editsById);
  const saveUserEdits = useUsersStore((state) => state.saveUserEdits);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const usersFromList = queryClient.getQueryData<UserApi[]>(['users']);
  const cachedUser = useMemo(
    () => usersFromList?.find((item) => item.id === userId),
    [userId, usersFromList],
  );

  const { data: userFromApi, isPending, isError, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserById(userId),
    enabled: isValidId,
  });

  const user = cachedUser ?? userFromApi;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: emptyForm,
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (!user) {
      return;
    }

    const merged = mergeEditable(user, editsById[user.id]);
    reset(merged);
  }, [editsById, reset, user]);

  if (!isValidId) {
    return <p className="feedback feedback--error">Некорректный ID пользователя</p>;
  }

  if (isPending && !user) {
    return <Loader message="Загрузка пользователя..." />;
  }

  if (isError && !user) {
    return <p className="feedback feedback--error">{error.message}</p>;
  }

  if (!user) {
    return <p className="feedback feedback--error">Пользователь не найден</p>;
  }

  const onSubmit = (values: UserFormData) => {
    const normalizedPhone = values.phone.replace(/\D/g, '');

    saveUserEdits(user.id, {
      ...values,
      phone: normalizedPhone,
    });

    setIsModalOpen(true);
  };

  return (
    <div className="edit-page container">
      <Link className="edit-page__back" to="/">
        <span aria-hidden="true">←</span>
        <span>Назад</span>
      </Link>

      <div className="edit-page__content">
        <aside className="settings-card">
          <img className="settings-card__image" src={editsById[user.id]?.avatarUrl ?? mergeEditable(user).avatarUrl} alt={user.username} />
          <ul className="settings-card__categories">
            <li className="settings-card__category settings-card__category--active">Данные профиля</li>
            <li className="settings-card__category">Рабочее пространство</li>
            <li className="settings-card__category">Приватность</li>
            <li className="settings-card__category">Безопасность</li>
          </ul>
        </aside>

        <section className="profile-card">
          <header className="profile-card__header">
            <h1>Данные профиля</h1>
          </header>

          <form className="profile-form" onSubmit={handleSubmit(onSubmit)}>
            <label className="profile-form__field">
              <span>Имя</span>
              <input type="text" {...register('name')} />
              {errors.name && <small>{errors.name.message}</small>}
            </label>

            <label className="profile-form__field">
              <span>Никнейм</span>
              <input type="text" {...register('username')} />
              {errors.username && <small>{errors.username.message}</small>}
            </label>

            <label className="profile-form__field">
              <span>Почта</span>
              <input type="email" {...register('email')} />
              {errors.email && <small>{errors.email.message}</small>}
            </label>

            <label className="profile-form__field">
              <span>Город</span>
              <input type="text" {...register('city')} />
              {errors.city && <small>{errors.city.message}</small>}
            </label>

            <label className="profile-form__field">
              <span>Телефон</span>
              <input
                type="text"
                inputMode="numeric"
                {...register('phone', {
                  onChange: (event) => {
                    event.target.value = String(event.target.value).replace(/\D/g, '');
                  },
                })}
              />
              {errors.phone && <small>{errors.phone.message}</small>}
            </label>

            <label className="profile-form__field">
              <span>Название компании</span>
              <input type="text" {...register('companyName')} />
              {errors.companyName && <small>{errors.companyName.message}</small>}
            </label>

            <label className="profile-form__field">
              <span>Аватарка (URL)</span>
              <input type="url" {...register('avatarUrl')} />
              {errors.avatarUrl && <small>{errors.avatarUrl.message}</small>}
            </label>

            <button className="profile-form__submit" type="submit" disabled={isSubmitting}>
              Сохранить
            </button>
          </form>
        </section>
      </div>

      <SuccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
