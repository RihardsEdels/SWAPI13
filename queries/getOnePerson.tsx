import { gql } from "@apollo/client";

export const GET_ONE_PERSON = gql`
  query Person($id: ID!) {
    person(id: $id) {
      name
      birthYear
      hairColor
      height
      gender
      homeworld {
        name
        population
        orbitalPeriod
      }
      species {
        classification
        name
      }
      filmConnection {
        films {
          title
          releaseDate
          producers
        }
      }
      starshipConnection {
        starships {
          name
          model
          starshipClass
        }
      }
    }
  }
`;
