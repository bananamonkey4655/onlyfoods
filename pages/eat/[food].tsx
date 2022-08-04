import { StarIcon } from "@chakra-ui/icons";
import {
  Grid,
  GridItem,
  Box,
  Container,
  Img,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

interface Restaurant {
  id: string;
  name: string;
  image_url: string;
  price: string;
  rating: number;
  alias: string;
  categories: { alias: string; title: string }[];
  review_count: number;
  location: { address1: string; display_address: string[] };
}

const FoodPage = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const router = useRouter();
  const { food } = router.query;
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.300");

  return (
    <Container py={5} maxW="1200px">
      <Grid
        gap={5}
        templateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        justifyContent="center"
      >
        {restaurants.map((restaurant) => {
          return (
            <GridItem justifyContent="center">
              <Box
                maxW="sm"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
              >
                <Img
                  src={restaurant.image_url}
                  alt={restaurant.alias}
                  boxSize="sm"
                  objectFit="cover"
                />

                <Box bgColor={bgColor} color={textColor} p="6">
                  <Box display="flex" alignItems="baseline">
                    <Badge borderRadius="full" px="2" colorScheme="red">
                      {restaurant.price ? restaurant.price : "N/A"}
                    </Badge>
                    <Box
                      color={textColor}
                      fontWeight="semibold"
                      letterSpacing="wide"
                      fontSize="xs"
                      textTransform="uppercase"
                      ml="2"
                    >
                      {restaurant.categories
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
                    color={useColorModeValue("gray.800", "gray.100")}
                  >
                    {restaurant.name}
                  </Box>

                  <Box>
                    <Box as="span" fontSize="sm">
                      {/* {restaurant.location.display_address.join(", ")}             */}
                      {restaurant.location.address1}
                    </Box>
                  </Box>

                  <Box display="flex" mt="2" alignItems="center">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <StarIcon
                          key={i}
                          color={i < restaurant.rating ? "red.400" : "gray.300"}
                        />
                      ))}
                    <Box as="span" ml="2" color={textColor} fontSize="sm">
                      {restaurant.review_count} reviews
                    </Box>
                  </Box>
                </Box>
              </Box>
            </GridItem>
          );
        })}
      </Grid>
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
