import { createHashRouter } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { EditUserPage } from '../pages/EditUserPage';
import { HomePage } from '../pages/HomePage';

export const router = createHashRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'users/:userId/edit',
        element: <EditUserPage />,
      },
    ],
  },
]);
