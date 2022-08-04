import { StarIcon } from "@chakra-ui/icons";
import { Box, Container, Img, Badge } from "@chakra-ui/react";
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
  location: { display_address: string[] };
}

const FoodPage = ({ restaurants }: { restaurants: Restaurant[] }) => {
  const router = useRouter();
  const { food } = router.query;

  return (
    <Container>
      {restaurants.map((restaurant) => {
        return (
          <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Img
              src={restaurant.image_url}
              alt={restaurant.alias}
              boxSize="sm"
              objectFit="cover"
            />

            <Box p="6">
              <Box display="flex" alignItems="baseline">
                <Badge borderRadius="full" px="2" colorScheme="red">
                  {restaurant.price ? restaurant.price : "N/A"}
                </Badge>
                <Box
                  color="gray.500"
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
              >
                {restaurant.name}
              </Box>

              <Box>
                <Box as="span" color="gray.600" fontSize="sm">
                  {restaurant.location.display_address.join(", ")}
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
                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                  {restaurant.review_count} reviews
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
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
