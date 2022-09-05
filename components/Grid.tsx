import React, { useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "next/link";
import { capitalizeFirstCharacter } from "../utils/capitalizeFirstCharacter";
import { motion } from "framer-motion";
import { PokemonContext } from "../context/PokemonContext";

const Grid = ({ pokemonsArray }: { pokemonsArray: PokemonsArray }) => {
  const { pokemonArray } = useContext(PokemonContext);

  return (
    <div className="grid-cards">
      {pokemonArray.map((pokemon: Pokemon) => {
        const [firsType] = pokemon.types;

        return (
          <Link href={{ pathname: `/pokemon/${pokemon.name}` }}>
            <div key={pokemon.id}>
              <div style={{ marginLeft: "20%" }}>
                <motion.img
                  layoutId={pokemon.front_default}
                  className="image"
                  src={pokemon.front_default}
                  alt=""
                />
              </div>
              <Card className={`${firsType.type.name} card`}>
                <CardActionArea>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="number"
                  >
                    {`#${pokemon.id}`}
                  </Typography>
                  <CardContent sx={{ height: "120px" }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ textAlign: "center", marginTop: "-12%" }}
                    >
                      {capitalizeFirstCharacter(pokemon.name)}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="pre-evolution"
                    >
                      {pokemon.evolvesFrom !== "none" && (
                        <>
                          <Typography className="pre-evolution">
                            <span>{`Pre-Evolution:`}</span>
                          </Typography>
                          <span>
                            {capitalizeFirstCharacter(pokemon.evolvesFrom)}
                          </span>
                        </>
                      )}
                    </Typography>

                    {pokemon.types.map((element: any, i: number) => {
                      return (
                        <Typography variant="body2" className="types" key={i}>
                          <span>{element.type.name}</span>
                        </Typography>
                      );
                    })}
                  </CardContent>
                </CardActionArea>
              </Card>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Grid;
