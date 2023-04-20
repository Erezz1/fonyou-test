import { createBrowserRouter } from 'react-router-dom';
import { HomePage, CharacterPage } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/*',
    element: (
      <div>
        <p>404</p>
        <p>Page not found</p>
      </div>
    )
  },
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/character/:characterId',
    element: <CharacterPage />
  },
]);
