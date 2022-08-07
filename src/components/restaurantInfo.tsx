import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Image, useColorModeValue } from "@chakra-ui/react";

import { Restaurant } from "@/utils/types";

const RestaurantInfo = ({
  restaurant,
  handleRestaurantClick,
}: {
  restaurant: Restaurant;
  handleRestaurantClick: (event: React.SyntheticEvent, id: string) => void;
}) => {
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

  const bgColor = useColorModeValue("gray.100", "gray.700");
  const headingColor = useColorModeValue("gray.800", "gray.100");
  const textColor = useColorModeValue("gray.800", "gray.300");

  return (
    <Box
      cursor="pointer"
      onClick={(event) => handleRestaurantClick(event, id)}
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
            {categories.map((category) => category.title).join(", ")}
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
              <StarIcon key={i} color={i < rating ? "red.400" : "gray.300"} />
            ))}
          <Box as="span" ml="2" color={textColor} fontSize="sm">
            {review_count} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RestaurantInfo;
