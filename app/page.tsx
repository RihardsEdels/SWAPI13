import Listing from "@/components/Listing/Listing";
import { getClient } from "@/lib/client";
import { gql } from "@apollo/client";
import { GET_ALL_PEOPLE } from "@/queries/getAllPeople"; // Import the query

export default async function Home() {
  const { data } = await getClient().query({
    query: GET_ALL_PEOPLE,
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });

  return <Listing listingData={data?.allPeople.people} />;
}
