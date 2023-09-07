import { gql } from "@apollo/client";

export const GET_ALL_PEOPLE = gql`
  query getAllPeople {
    allPeople {
      people {
        name
      }
    }
  }
`;
