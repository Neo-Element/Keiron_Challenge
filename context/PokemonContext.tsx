import React, { useState, createContext, ReactNode } from "react";

interface PokemonProviderProps {
  children: ReactNode;
}

const initialState = {
  evolvesFrom: "",
  front_default: "",
  id: 0,
  name: "",
  types: [
    { slot: 0, type: { name: "", url: "" } },
    { slot: 0, type: { name: "", url: "" } },
  ],
};

export const PokemonContext = createContext({
  pokemonArray: [],
  setPokemonArray: (pokemonArray: any): void => {},
});

const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const [pokemonArray, setPokemonArray] = useState([]);

  return (
    <PokemonContext.Provider value={{ pokemonArray, setPokemonArray }}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
