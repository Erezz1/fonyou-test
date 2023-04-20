import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Spinner } from '../components';

import './character.css';

const CharacterPage = () => {
  const { characterId } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then(res => res.json())
      .then(character => setCharacter(character))
      .finally(() => setIsLoading(false));
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  if (!character) {
    return <p>Error 404</p>
  }

  return (
    <div className="character__container">
      <button onClick={() => navigate('/fonyou-test')}>{'<'}</button>
      <div className="character__details">
        <img
          src={character.image}
          alt={character.name + ' image'}
        />
        <div>
          <p>
            Name: <span>{character.name} - #{character.id}</span>
          </p>
          <p>
            Gender: <span>{character.gender}</span>
          </p>
          <p>
            Location: <span>{character.location.name}</span>
          </p>
          {
            character.type &&
            <p>
              Type: <span>{character.type}</span>
            </p>
          }
          <p>
            Origin: <span>{character.origin.name}</span>
          </p>
        </div>
      </div>
    </div >
  )
}

export default CharacterPage;
