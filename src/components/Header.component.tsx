import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './header.css';

const Searcher = () => {
  const [formState, setFormState] = useState<string>('');
  const navigate = useNavigate();

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setFormState(target.value);
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    navigate(`?search=${formState}`);
  }

  return (
    <header
      className="header__container"
      style={{ backgroundImage: "url('/bg-rickandmorty.webp')" }}
    >
      <form
        className="header__form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={formState}
          onChange={handleInputChange}
        />
        <button type="submit">
          Buscar
        </button>
      </form>
    </header>
  )
}

export default Searcher;
