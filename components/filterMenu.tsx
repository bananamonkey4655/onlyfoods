import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import { MdManageSearch } from "react-icons/md";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Image,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRestaurantStore } from "../utils/useRestaurantStore";

const FilterMenu = () => {
  const { query } = useRouter();
  const { sortByHighestRating, sortByLowestRating } = useRestaurantStore();

  return (
    <Menu>
      <MenuButton
        mx="2"
        as={IconButton}
        aria-label="Options"
        icon={<MdManageSearch />}
        variant="outline"
      />
      <MenuList>
        <MenuGroup title="Sort by">
          <MenuItem icon={<FaRegThumbsUp />} onClick={sortByHighestRating}>
            Highest
          </MenuItem>
          <MenuItem icon={<FaRegThumbsDown />} onClick={sortByLowestRating}>
            Lowest
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default FilterMenu;
