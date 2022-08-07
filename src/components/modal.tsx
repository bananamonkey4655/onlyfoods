import { ExternalLinkIcon, StarIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  Button,
  Image as ChakraImage,
  Badge,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import yelp_logo from "/public/yelp_logo_light.png";

import Image from "next/image";
import { Restaurant } from "@/utils/types";

const RestaurantModal = ({
  isOpen,
  onOpen,
  onClose,
  restaurant,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  restaurant: Restaurant | null;
}) => {
  const bgColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.300");
  const headingColor = useColorModeValue("gray.800", "gray.100");
  const buttonColor = useColorModeValue("gray.300", "gray.500");

  if (!restaurant) {
    return null;
  }

  const {
    id,
    name,
    image_url,
    url,
    price,
    phone,
    rating,
    alias,
    transcations,
    categories,
    review_count,
    location,
  } = restaurant;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ChakraImage src={image_url} fallbackSrc="/burger.png" alt={alias} />
        <ModalCloseButton />
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
              {location.display_address.join(", ")}
            </Box>
          </Box>

          <Box>
            <Box as="span" fontSize="sm" fontWeight="semibold" color="red.300">
              {phone}
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
        <ModalFooter bgColor={bgColor}>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Button bgColor={buttonColor}>
              <Image src={yelp_logo} alt="Yelp Logo" height="25" width="60" />
              <div className="w-2" />
              <ExternalLinkIcon />
            </Button>
          </a>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RestaurantModal;
