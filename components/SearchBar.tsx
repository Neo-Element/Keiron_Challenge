import React, { ChangeEvent, FormEvent, useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

const SearchBar = () => {
  const [searchedPokemon, setSearchedPokemon] = useState<SearchedPokemon>();
  const [inputValidation, setInputValidation] = useState(true);
  const router = useRouter();

  const setPokemonState = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchedPokemon(event.target.value);
  };

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
