import "@/styles/globals.css";
import theme from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";

import Head from "next/head";
import type { AppProps } from "next/app";
import Layout from "@/components/layout";
// import {
//   Hydrate,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>OnlyFoods</title>
        <meta
          name="description"
          content="A website that helps you search for food in Singapore"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
