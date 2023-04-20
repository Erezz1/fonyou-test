interface Data {
  info: Info;
  results: Character[];
}

export const fetchCharacter = async (name: string, page: number) => {
  const response = await fetch(`https://rickandmortyapi.com/api/character?name=${name}&page=${page}`);
  const { results, info: { pages } } = await response.json() as Data;

  return {
    characters: results,
    pages
  }
}
