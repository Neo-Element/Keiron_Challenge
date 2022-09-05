import React, { ChangeEvent, FormEvent, useState, useContext } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { filterPokemons } from "../utils/filterPokemons";
import { PokemonContext } from "../context/PokemonContext";

const SearchBar = ({ pokemonsArray }: { pokemonsArray: PokemonsArray }) => {
  const [searchedPokemon, setSearchedPokemon] = useState<SearchedPokemon>();
  const [inputValidation, setInputValidation] = useState(true);
  const router = useRouter();
  const { pokemonArray, setPokemonArray } = useContext(PokemonContext);
  const { pathname } = router;

  const setPokemonState = (event: ChangeEvent<HTMLInputElement>) => {
    let input = event.target.value.toLowerCase().trim();
    setSearchedPokemon(input);

    if (pathname === "/") {
      let filteredPokemons: [] = filterPokemons(input, pokemonsArray);
      setPokemonArray(filteredPokemons);
    }
  };

  console.log("ESTE ES EL DIRECTORIO", router.pathname);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchedPokemon) return setInputValidation(false);
    setInputValidation(true);
    router.push(`/pokemon/${searchedPokemon}`);
  };

  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          width: 400,
          margin: "auto",
          marginTop: "2%",
          marginBottom: "-3%",
        }}
        onSubmit={handleSubmit}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Find it and catch'em all!"
          value={searchedPokemon}
          onChange={setPokemonState}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      {inputValidation || (
        <p style={{ textAlign: "center", color: "white", paddingTop: "5%" }}>
          You must write something before searching
        </p>
      )}
    </>
  );
};

export default SearchBar;
