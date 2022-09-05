import type { GetServerSideProps } from "next";
import Grid from "../components/Grid";
import axios, { AxiosResponse } from "axios";

export const getServerSideProps: GetServerSideProps = async () => {
  const { REQUEST, LIMIT } = process.env;
  const URL = `${REQUEST}${LIMIT}`;

  const {
    data: { results },
  }: AxiosResponse = await axios.get(URL);

  const pokemonsPromisesArray = results.map(
    async ({ url }: { url: string }) => {
      const {
        data: {
          name,
          types,
          id,
          species: { url: speciesURL },
          sprites: {
            other: {
              home: { front_default },
            },
          },
        },
      }: AxiosResponse = await axios.get(url);

      let {
        data: { evolves_from_species: evolvesFrom },
      }: AxiosResponse = await axios.get(`${speciesURL}`);

      evolvesFrom ? (evolvesFrom = evolvesFrom.name) : (evolvesFrom = "none");

      return { name, types, id, front_default, evolvesFrom };
    }
  );

  const pokemonsArray = await Promise.all(pokemonsPromisesArray);

  return {
    props: { pokemonsArray },
  };
};

const Home = ({ pokemonsArray }: { pokemonsArray: PokemonsArray }) => {
  return (
    <>
      <Grid pokemonsArray={pokemonsArray} />
    </>
  );
};

export default Home;
