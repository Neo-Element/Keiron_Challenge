import { Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
  const image404 =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png";

  return (
    <>
      <div className="not-found">
        <Typography variant="h4">
          Sorry trainer! We couldn&apos;t find that Pokemon! Keep looking for &apos;em.
        </Typography>
      </div>
      <div className="pokeball-container">
        <img className="pokeball" src={image404} alt="" />
      </div>
    </>
  );
};

export default NotFound;
