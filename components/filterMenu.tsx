import { MdManageSearch } from "react-icons/md";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  IconButton,
} from "@chakra-ui/react";
import { useRestaurantStore } from "../utils/useRestaurantStore";

const FilterMenu = () => {
  const {
    sortByHighestRating,
    sortByLowestRating,
    sortByAffordable,
    sortByExpensive,
  } = useRestaurantStore();

  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        mx="2"
        as={IconButton}
        aria-label="Options"
        icon={<MdManageSearch />}
        variant="outline"
      />
      <MenuList>
        <MenuOptionGroup title="Ratings" type="radio">
          <MenuItemOption value="best" onClick={sortByHighestRating}>
            Highest
          </MenuItemOption>
          <MenuItemOption value="lowest" onClick={sortByLowestRating}>
            Lowest
          </MenuItemOption>
        </MenuOptionGroup>
        <MenuOptionGroup title="Budget" type="radio">
          <MenuItemOption value="expensive" onClick={sortByExpensive}>
            Expensive
          </MenuItemOption>
          <MenuItemOption value="affordable" onClick={sortByAffordable}>
            Affordable
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export default FilterMenu;
