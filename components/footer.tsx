import yelp_light from "../public/yelp_logo_light.png";
import yelp_dark from "../public/yelp_logo_dark.png";
import Image from "next/image";
import { useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
  const yelpLogo = useColorModeValue(yelp_light, yelp_dark);

  return (
    <footer className="flex justify-center w-full">
      <div className="pb-2 flex justify-end items-center gap-3 w-full max-w-screen-xl px-4 font-mono">
        <a
          href="https://www.flaticon.com/free-stickers/fast-food"
          title="fast food stickers"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-xs hover:text-gray-500">
            Assets from flaticon
          </span>
        </a>
        <span>&bull;</span>
        <a
          href="https://www.yelp.com/developers/documentation/v3/get_started"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-xs gap-1 flex items-center justify-center hover:text-gray-500">
            <span className="px-1">Powered by</span>
            <Image src={yelpLogo} alt="Yelp Logo" height="20" width="50" />
          </p>
        </a>
      </div>
    </footer>
  );
};
export default Footer;
