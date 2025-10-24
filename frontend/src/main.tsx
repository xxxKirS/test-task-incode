import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import AppLayout from './layouts/app-layout';
import NotFound from './pages/not-found';
import Board from './pages/board';
import Boards from './pages/boards';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: Boards,
      },
      {
        path: '/:boardId',
        Component: Board,
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
