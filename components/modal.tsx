import { StarIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalCloseButton,
  Button,
  Img,
  Badge,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Restaurant } from "../utils/types";

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

  if (!restaurant) {
    return null;
  }

  const {
    id,
    name,
    image_url,
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
        <Img src={image_url} alt={alias} />
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
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RestaurantModal;
