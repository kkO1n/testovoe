import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { EditUserPage } from '../pages/EditUserPage';
import { HomePage } from '../pages/HomePage';

export const router = createBrowserRouter([
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
