import { StarIcon } from "@chakra-ui/icons";
import {
  Image,
  Box,
  Container,
  Grid,
  GridItem,
  Badge,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RestaurantModal from "../../components/modal";
import { Restaurant } from "../../utils/types";
import { foodData } from "../../utils/foodData";
import { useRestaurantStore } from "../../utils/useRestaurantStore";
import Error from "../../components/error";

const FoodPage = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const { isFallback } = useRouter();

  const [clickedRestaurant, setClickedRestaurant] = useState<Restaurant | null>(
    null
  );
  const { sortedRestaurants } = useRestaurantStore();

  const handleModal = useDisclosure();
  const { isOpen, onOpen, onClose } = handleModal;

  // Required for zustand to work? Otherwise stores are not updated
  useEffect(() => {
    useRestaurantStore.getState().setRestaurants(restaurants);
  }, [restaurants]);

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const headingColor = useColorModeValue("gray.800", "gray.100");
  const textColor = useColorModeValue("gray.800", "gray.300");

  const handleModalClick = (event: React.SyntheticEvent, id: string) => {
    const currRestaurant = sortedRestaurants.find((r) => r.id === id);
    if (!currRestaurant) {
      return;
    }
    setClickedRestaurant(currRestaurant);
    onOpen();
  };

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
            const {
              id,
              name,
              image_url,
              price,
              rating,
              alias,
              categories,
              review_count,
              location,
            } = restaurant;

            return (
              <GridItem justifyContent="center" key={id}>
                <Box
                  cursor="pointer"
                  onClick={(event) => handleModalClick(event, id)}
                  maxW="sm"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Image
                    src={image_url}
                    fallbackSrc="/burger.png"
                    alt={alias}
                    boxSize="sm"
                    objectFit="cover"
                  />

                  <Box bgColor={bgColor} color={textColor} p="6">
                    <Box display="flex" alignItems="baseline">
                      <Badge borderRadius="full" px="2" colorScheme="red">
                        {price ?? "N/A"}
                      </Badge>
                      <Box
                        color={textColor}
                        fontWeight="semibold"
                        letterSpacing="wide"
                        fontSize="xs"
                        textTransform="uppercase"
                        ml="2"
                      >
                        {categories
                          .map((category) => category.title)
                          .join(", ")}
                      </Box>
                    </Box>

                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      noOfLines={1}
                      color={headingColor}
                    >
                      {name}
                    </Box>

                    <Box>
                      <Box as="span" fontSize="sm">
                        {location.address1}
                      </Box>
                    </Box>

                    <Box display="flex" mt="2" alignItems="center">
                      {Array(5)
                        .fill("")
                        .map((_, i) => (
                          <StarIcon
                            key={i}
                            color={i < rating ? "red.400" : "gray.300"}
                          />
                        ))}
                      <Box as="span" ml="2" color={textColor} fontSize="sm">
                        {review_count} reviews
                      </Box>
                    </Box>
                  </Box>
                </Box>
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
