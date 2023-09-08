import React, { useState } from "react";
import Link from "next/link";
import classes from "./listingCard.module.css";
import { format } from "date-fns";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Tags from "../Tags/Tags";

interface ListingCardProps {
  characterData: {
    name: string;
    homeworld: {
      name: string;
    };
    filmConnection: {
      films: {
        title: string;
      }[];
    };
  };
}

const ListingCard: React.FC<ListingCardProps> = ({ characterData }) => {
  const {
    name,
    homeworld,
    filmConnection,
    starshipConnection,
    birthYear,
    created,
    height,
    species,
  } = characterData;
  const [dropdown, setDropdown] = useState({
    open: true,
    type: "movies",
  });

  const cardDate = format(new Date(created), "MMMM do yyyy");

  const statsData = [
    { label: "Birth year:", value: birthYear === "unknown" ? null : birthYear },
    {
      label: "Homeworld:",
      value: homeworld.name === "unknown" ? null : homeworld.name,
    },
    { label: "Height:", value: height },
    { label: "Species:", value: species?.name || "Human" },
  ];

  const handleListDropdown = (e) => {
    setDropdown((prevState) => ({
      ...prevState,
      open: e.target.id === prevState.type ? !prevState.open : true,
      type: e.target.id,
    }));
  };

  const moviesList = filmConnection.films.map((film, index) => (
    <li className={classes.dropdownListItem} key={index}>
      {film.title}
    </li>
  ));

  const starshipList = starshipConnection.starships.map((ship, index) => (
    <li className={classes.dropdownListItem} key={index}>
      {ship.name}
    </li>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.characterInfo}>
        <div className={classes.cardDate}>{cardDate}</div>
        <div className={classes.nameContainer}>
          <Image
            className={classes.characterImage}
            width={35}
            height={35}
            alt=""
            src="/sw.png"
          />
          <Link href={`/${name}`}>
            <h2 className={classes.name}>{name}</h2>
          </Link>
        </div>
        <div className={classes.statsContainer}>
          {statsData.map((s) => (
            <div className={classes.statsItem} key={s.label}>
              <span>{s.label}</span>
              <span>{s.value}</span>
            </div>
          ))}
        </div>

        <Tags tagData={statsData} />
      </div>

      <div className={classes.characterConnections}>
        <div className={classes.actions}>
          {moviesList.length ? (
            <Button id="movies" onClick={(e) => handleListDropdown(e)}>
              Movies
            </Button>
          ) : null}
          {starshipList.length ? (
            <Button id="starships" onClick={(e) => handleListDropdown(e)}>
              Starships
            </Button>
          ) : null}
        </div>

        <div className={!dropdown.open ? "hidden lg:block" : "block"}>
          <span className="text-sm mt-1">{`${
            dropdown.type === "movies" ? "Movies" : "Starship"
          } connections:`}</span>
          <ul className={classes.dropdownList}>
            {dropdown.type === "movies" ? moviesList : starshipList}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
