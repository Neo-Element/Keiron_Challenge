type Pokemon = {
  name: string;
  types: Types;
  id: number;
  front_default: string;
  evolvesFrom: string;
};

type PokemonsArray = Pokemon[];

type Types = [
  { slot: number; type: { name: string; url: string } },
  { slot?: number; type?: { name?: string; url?: string } }
];

type Abilities = {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
};

type SinglePokemon = {
  abilities: Abilities[];
  height: number;
  weight: number;
  front_default: string;
  front_shiny: string;
  id: number;
  chain: Object;
  types: Types;
  name: string;
};

type SearchedPokemon = string;
