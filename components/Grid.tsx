import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Link from "next/link";
import { capitalizeFirstCharacter } from "../utils/capitalizeFirstCharacter";
import { motion } from "framer-motion";

const Grid = ({ pokemonsArray }: { pokemonsArray: PokemonsArray }) => {
  return (
    <div className="grid-cards">
      {pokemonsArray.map(({ name, types, id, front_default, evolvesFrom }) => {
        const [firsType] = types;

        return (
          <Link href={{ pathname: `/pokemon/${name}` }}>
            <div key={id}>
              <div style={{ marginLeft: "20%" }}>
                <motion.img
                  layoutId={front_default}
                  className="image"
                  src={front_default}
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
                    {`#${id}`}
                  </Typography>
                  <CardContent sx={{ height: "120px" }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      sx={{ textAlign: "center", marginTop: "-12%" }}
                    >
                      {capitalizeFirstCharacter(name)}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="pre-evolution"
                    >
                      {evolvesFrom !== "none" && (
                        <>
                          <Typography className="pre-evolution">
                            <span>{`Pre-Evolution:`}</span>
                          </Typography>
                          <span>{capitalizeFirstCharacter(evolvesFrom)}</span>
                        </>
                      )}
                    </Typography>

                    {types.map((element: any, i: number) => {
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
