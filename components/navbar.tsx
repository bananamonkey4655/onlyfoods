import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";
import Link from "next/link";
import { IoFastFoodOutline } from "react-icons/io5";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <header className="w-full flex justify-center backdrop-blur-sm sticky top-0">
      <nav className="max-w-7xl w-10/12 flex justify-between items-center py-4 px-3">
        <Link href="/">
          <a className="font-semibold flex justify-between items-center">
            <IoFastFoodOutline />
            <span className="px-2"> OnlyFood</span>
          </a>
        </Link>
        <IconButton
          aria-label="Toggle theme"
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
        />
      </nav>
    </header>
  );
};

export default Navbar;
