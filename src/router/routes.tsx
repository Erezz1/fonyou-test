import { createBrowserRouter, Navigate } from 'react-router-dom';
import { HomePage, CharacterPage } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/*',
    element: <Navigate to="/fonyou-test/" />
  },
  {
    path: '/fonyou-test/',
    element: <HomePage />
  },
  {
    path: '/fonyou-test/character/:characterId',
    element: <CharacterPage />
  },
]);
