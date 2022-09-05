export const filterPokemons: Function = (
  pokemonToFilter: string,
  pokemonsArray: PokemonsArray
) => {
  const filteredPokemons = pokemonsArray.filter((pokemon: Pokemon) => {
    return pokemon.name.includes(pokemonToFilter);
  });

  return filteredPokemons;
};
