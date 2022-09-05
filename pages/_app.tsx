import "../styles/globals.css";
import type { AppProps } from "next/app";
import SearchBar from "../components/SearchBar";
import PokemonProvider from "../context/PokemonContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <PokemonProvider>
        <SearchBar pokemonsArray={pageProps.pokemonsArray} />;
        <Component {...pageProps} />
      </PokemonProvider>
    </>
  );
}

export default MyApp;
