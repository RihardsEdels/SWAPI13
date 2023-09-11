import { getClient } from "@/lib/client";
import { GET_ONE_PERSON } from "@/queries/getOnePerson";
import Image from "next/image";

import classes from "./page.module.css";
import Tabs from "@/components/Tabs/Tabs";
import { Person } from "@/types/types";

type PageProps = {
  params: { character: string };
};

export default async function Character({ params }: PageProps) {
  const { character } = params;
  const {
    data: { person },
  } = await getClient().query({
    query: GET_ONE_PERSON,
    variables: { id: `${character}=` },
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });

  const {
    homeworld,
    filmConnection,
    starshipConnection,
    birthYear,
    height,
    species,
    gender,
    hairColor,
  }: Person = person;

  const moviesList = filmConnection?.films.map((film, index) => {
    const shipStats = [
      { label: "Title:", value: film.title },
      { label: "Release date:", value: film.releaseDate },
    ];
    return (
      <div key={index}>
        <div className={classes.tabListingHeading}>{film.title}</div>
        <div className={classes.tabListingContainer}>
          {shipStats.map((s) => (
            <div className={classes.tabListingItem} key={s.value}>
              <span>{s.label}</span>
              <span>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  });

  const starshipList = starshipConnection?.starships.map((ship, index) => {
    const shipStats = [
      { label: "Model:", value: ship.model },
      { label: "Class:", value: ship.starshipClass },
    ];
    return (
      <div key={index}>
        <div className={classes.tabListingHeading}>{ship.name}</div>
        <div className={classes.tabListingContainer}>
          {shipStats.map((s) => (
            <div className={classes.tabListingItem} key={s.value}>
              <span>{s.label}</span>
              <span>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  });

  const statsData = [
    { label: "Birth year:", value: birthYear === "unknown" ? null : birthYear },
    { label: "Gender:", value: gender || "-" },
    { label: "Hair color:", value: hairColor || "-" },
    { label: "Height:", value: height },
  ];

  return (
    <div className={classes.root}>
      <div className={classes.personDetails}>
        <Image
          className={classes.image}
          alt={person.name}
          width={600}
          height={600}
          src="/sw.png"
        />
        <div className={classes.personDetailsContainer}>
          <div className={classes.name}>{person.name}</div>
          <div>
            <div className={classes.statsContainer}>
              {statsData.map((s) => (
                <div className={classes.statsItem} key={s.label}>
                  <span>{s.label}</span>
                  <span>{s.value}</span>
                </div>
              ))}

              <div className={classes.extraInfo}>Homeworld</div>
              <div className={classes.statsItem}>
                <span>Name:</span>
                <span>{homeworld?.name || "-"}</span>
              </div>
              <div className={classes.statsItem}>
                <span>Population:</span>
                <span>{homeworld?.population || "-"}</span>
              </div>
              <div className={classes.statsItem}>
                <span>Orbital period:</span>
                <span>{homeworld?.orbitalPeriod || "-"}</span>
              </div>

              <div className={classes.extraInfo}>Species</div>
              <div className={classes.statsItem}>
                <span>Name:</span>
                <span>{species?.name || "Human"}</span>
              </div>
              <div className={classes.statsItem}>
                <span>Classification:</span>
                <span>{species?.classification || "-"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tabs
        tabs={[
          {
            label: "Movies",
            value: "movies",
            content: moviesList?.length ? moviesList : null,
          },
          {
            label: "Starships",
            value: "starships",
            content: starshipList?.length ? starshipList : null,
          },
        ]}
      />
    </div>
  );
}
