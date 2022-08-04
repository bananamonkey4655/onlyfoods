import { StarIcon } from "@chakra-ui/icons";
import {
  Grid,
  GridItem,
  Box,
  Container,
  Img,
  Badge,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import RestaurantModal from "../../components/modal";
import { Restaurant } from "../../types";

const FoodPage = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const router = useRouter();
  const { food } = router.query;
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const handleModal = useDisclosure();
  const { isOpen, onOpen, onClose } = handleModal;

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.300");
  const headingColor = useColorModeValue("gray.800", "gray.100");

  const handleModalClick = (event: React.SyntheticEvent, id: string) => {
    const clickedRestaurant = restaurants.find((r) => r.id === id);
    if (!clickedRestaurant) {
      return;
    }
    setRestaurant(clickedRestaurant);
    onOpen();
  };

  if (!restaurants.length) {
    return <Container>Nothing found!</Container>; //404
  }

  return (
    <>
      <Head>
        <title>OnlyFoods</title>
        <meta
          name="description"
          content="A website that helps you search for food in Singapore"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container py={5} maxW="1200px">
        <RestaurantModal {...handleModal} restaurant={restaurant} />

        <Grid
          gap={5}
          templateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          justifyContent="center"
        >
          {restaurants.map((restaurant) => {
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
                  <Img
                    src={image_url}
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
                        {/* {restaurant.location.display_address.join(", ")}             */}
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
