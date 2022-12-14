import { IoFastFoodOutline } from "react-icons/io5";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";

import Link from "next/link";
import FilterMenu from "@/components/filterMenu";

const Navbar = ({ isHomePage }: { isHomePage: boolean }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header className="w-full flex justify-center backdrop-blur-sm sticky top-0">
      <nav className="max-w-7xl w-full lg:w-10/12 flex justify-between items-center py-4 px-6">
        <Link href="/">
          <div className="text-2xl font-semibold flex justify-between items-center cursor-pointer">
            <IoFastFoodOutline />
            <span className="px-2">OnlyFoods</span>
          </div>
        </Link>
        <div>
          {!isHomePage && <FilterMenu />}
          <IconButton
            aria-label="Toggle theme"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
