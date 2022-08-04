import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
} from "@chakra-ui/react";
import { Restaurant } from "../types";

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
  if (!restaurant) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{restaurant.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold" mb="1rem">
            {restaurant.price}
          </Text>
          <Text>Hello world</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RestaurantModal;
