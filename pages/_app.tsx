import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

import type { AppProps } from "next/app";

import Navbar from "../components/navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
