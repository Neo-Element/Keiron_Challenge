import React from "react";
import { GetServerSideProps } from "next";
import axios, { AxiosResponse } from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { capitalizeFirstCharacter } from "../../utils/capitalizeFirstCharacter";
import { motion } from "framer-motion";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CardActionArea } from "@mui/material";
import NotFound from "../../components/NotFound";
import { evolutions } from "../../utils/getEvolutions";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const {
      query: { pokemonName },
    } = context;
    const { SINGLE_REQUEST } = process.env;

    const {
      data: {
        name,
        id,
        abilities,
        height,
        weight,
        types,
        species: { url: speciesURL },
        sprites: {
          other: {
            home: { front_default, front_shiny },
          },
        },
      },
    }: AxiosResponse = await axios.get(`${SINGLE_REQUEST}${pokemonName}`);

    const {
      data: {
        evolution_chain: { url: evolutionURL },
      },
    }: AxiosResponse = await axios.get(`${speciesURL}`);

    const {
      data: { chain },
    }: AxiosResponse = await axios.get(evolutionURL);

    return {
      props: {
        abilities,
        height,
        weight,
        front_default,
        front_shiny,
        id,
        chain,
        types,
        name,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

const PokemonCard = (props: SinglePokemon) => {
  if (!props.id) return <NotFound />;

  const [type] = props.types;

  return (
    <Card className="card-container">
      <div className={`cover ${type.type.name}`}>
        <Link href={{ pathname: "/" }}>
          <CardActionArea>
            <ArrowBackIcon sx={{ marginTop: "2%", marginLeft: "3%" }} />
          </CardActionArea>
        </Link>
      </div>
      <motion.img
        layoutId={props.front_default}
        src={props.front_default}
        alt=""
        className="cover-image"
      />
      <CardContent>
        <Typography
          sx={{ textAlign: "center" }}
          gutterBottom
          variant="h2"
          component="div"
        >
          {capitalizeFirstCharacter(props.name)}
        </Typography>
        <Typography
          className="properties"
          gutterBottom
          variant="h4"
          component="div"
        >
          Abilities:{" "}
          {props.abilities.map((ability: Abilities, i: number) => {
            return (
              <span
                key={i}
                className={`abilities ${props.types[0].type.name}`}
              >
                {capitalizeFirstCharacter(ability.ability.name)}
              </span>
            );
          })}
        </Typography>
        <Typography className="properties" variant="h4">
          Height: {props.height} ft.
        </Typography>
        <Typography className="properties" variant="h4">
          Weight: {props.weight} lb
        </Typography>
        <Typography className="properties" variant="h4">
          Shiny:
          <span>
            <img className="shiny-image" src={props.front_shiny}></img>
          </span>
        </Typography>
        <Typography
          className="properties"
          gutterBottom
          variant="h4"
          component="div"
          sx={{ textAlign: "center" }}
        >
          Evolution:{" "}
          {evolutions(props.chain).map((evolution: string, i:number) => {
            return (
              <Link key={i} href={{ pathname: `/pokemon/${evolution}` }}>
                <CardActionArea >
                  <span className={`evolutions ${props.types[0].type.name}`}>
                    {capitalizeFirstCharacter(evolution)}
                  </span>
                </CardActionArea>
              </Link>
            );
          })}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
