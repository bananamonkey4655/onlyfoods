import { Box, Container, Heading } from "@chakra-ui/react";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { useRouter } from "next/router";

interface Restaurant {
  id: string;
  name: string;
  image_url: string;
}

const FoodPage = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const router = useRouter();
  const { food } = router.query;

  return (
    <Container>
      <Box>
        <Heading>{food}</Heading>
        <Box>
          {restaurants.map((restaurant) => {
            return (
              <Box key={restaurant.id}>
                <h1>{restaurant.name}</h1>
                <img src={restaurant.image_url} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { food } = context.params!;
  const config = {
    headers: {
      Authorization: `Bearer ${process.env.YELP_APIKEY}`,
    },
  };
  const res = await fetch(
    `https://api.yelp.com/v3/businesses/search?location=singapore&term=food_${food}`,
    config
  );
  const data = await res.json();

  return {
    props: {
      restaurants: data.businesses,
    },
  };
};

export default FoodPage;
