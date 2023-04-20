import { FC, ReactNode, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Spinner } from '.';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getCharactersAsync } from '../features/character/characterSlice';

import './character-list.css';

const CharactersList = () => {

  const [page, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.character);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    dispatch(getCharactersAsync({
      name: searchQuery || '',
      page
    }));
  }, [searchQuery, page, dispatch]);

  if (state.status === 'loading') {
    return <Spinner />
  }

  if (state.status === 'failed') {
    return <p>No se encuentra nada, podrias hacer otra busqueda</p>
  }

  return (
    <main className="list__container">
      <ul className="characters__container">
        {state.charactersList.map(character => (
          <CharacterItem
            key={character.id}
            character={character}
          />
        ))}
      </ul>

      <div className="character__controls">
        {
          page > 1 &&
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          >
            {'<'}
          </button>
        }
        <p>{page} de {state.pages}</p>
        {
          page < state.pages &&
          <button
            onClick={() => setPage(prev => Math.min(prev + 1, state.pages))}
          >
            {'>'}
          </button>
        }
      </div>
    </main>
  )
}

const statusColors: Record<Status, string> = {
  Alive: 'green',
  Dead: 'red',
  unknown: 'gray',
}
interface CharacterItemProps {
  children?: ReactNode;
  character: Character;
}
const CharacterItem: FC<CharacterItemProps> = ({ character }) => {
  const navigate = useNavigate();

  const handleNavigate = () => navigate('/character/' + character.id);

  return (
    <li
      className="character__item"
    >
      <article>
        <div className="character__item-image">
          <img
            src={character.image}
            alt={character.name + ' image'}
            style={{ borderColor: statusColors[character.status] }}
          />
          <p style={{ backgroundColor: statusColors[character.status] }}>
            {character.status}
          </p>
        </div>
        <h1>
          {character.name}
        </h1>
        <p>Last known location:<br /><span>{character.location.name}</span></p>
        <p>species:<br /><span>{character.species}</span></p>
        <p>gender:<br /><span>{character.gender}</span></p>

        <button onClick={handleNavigate}>See more</button>
      </article>
    </li>
  )
}

export default CharactersList;
