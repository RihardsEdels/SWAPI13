import { gql } from "@apollo/client";

export const GET_ALL_PEOPLE = gql`
  query getAllPeople {
    allPeople {
      people {
        id
        name
        created
        birthYear
        height
        species {
          name
        }
        homeworld {
          name
        }
        filmConnection {
          films {
            title
          }
        }
        starshipConnection {
          starships {
            name
          }
        }
      }
    }
  }
`;
