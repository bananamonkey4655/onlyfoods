import { Container, Grid, GridItem, useDisclosure } from "@chakra-ui/react";

import { GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Error from "@/components/error";
import RestaurantInfo from "@/components/restaurantInfo";
import RestaurantModal from "@/components/modal";
import { Restaurant } from "@/utils/types";
import { foodData } from "@/utils/foodData";
import { useRestaurantStore } from "@/utils/useRestaurantStore";

const FoodPage = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const { isFallback } = useRouter();

  const [clickedRestaurant, setClickedRestaurant] = useState<Restaurant | null>(
    null
  );
  const { sortedRestaurants } = useRestaurantStore();

  const handleModal = useDisclosure();
  const { onOpen } = handleModal;

  const handleRestaurantClick = (event: React.SyntheticEvent, id: string) => {
    const currRestaurant = sortedRestaurants.find((r) => r.id === id);

    if (!currRestaurant) {
      return;
    }

    setClickedRestaurant(currRestaurant);
    onOpen();
  };

  // Required for zustand to work? Otherwise stores are not updated
  useEffect(() => {
    useRestaurantStore.getState().setRestaurants(restaurants);
  }, [restaurants]);

  if (isFallback) {
    return <div>Loading...</div>; //TODO: skeleton
  }

  if (!sortedRestaurants.length) {
    return <Error />;
  }

  return (
    <>
      <Container py={5} maxW="1200px">
        <RestaurantModal {...handleModal} restaurant={clickedRestaurant} />

        <Grid
          gap={5}
          templateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          justifyContent="center"
        >
          {sortedRestaurants.map((restaurant) => {
            return (
              <GridItem justifyContent="center" key={restaurant.id}>
                <RestaurantInfo
                  restaurant={restaurant}
                  handleRestaurantClick={handleRestaurantClick}
                />
              </GridItem>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { food } = params!;

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.YELP_APIKEY}`,
    },
  };

  const response = await fetch(
    `https://api.yelp.com/v3/businesses/search?location=singapore&term=food_${food}`,
    config
  );

  if (!response.ok) {
    return {
      notFound: true,
    };
  }

  const data = await response.json();

  const restaurants: Restaurant[] = data.businesses;

  useRestaurantStore.getState().setRestaurants(restaurants);
  return {
    props: {
      restaurants,
      // JSON.parse(JSON.stringify(restaurants)); Serializing?
    },
  };
};

// Only pre-build these paths
export const getStaticPaths = async () => {
  const paths = foodData.map((food) => {
    return {
      params: {
        food: food.name,
      },
    };
  });

  return {
    paths,
    fallback: "blocking", // Any other paths build during run-time
  };
};

/** SSR */
// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const { food } = context.params!;
//   const config = {
//     headers: {
//       Authorization: `Bearer ${process.env.YELP_APIKEY}`,
//     },
//   };
//   const res = await fetch(
//     `https://api.yelp.com/v3/businesses/search?location=singapore&term=food_${food}`,
//     config
//   );
//   const data = await res.json();

//   return {
//     props: {
//       restaurants: data.businesses,
//     },
//   };
// };

export default FoodPage;
