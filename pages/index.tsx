import type { NextPage } from "next";
import Head from "next/head";
import { Heading } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-xl font-bold bg-red-300">Hello world</h1>
        <h1>Hello text</h1>
        <Heading>Hello chakra</Heading>
      </main>
    </div>
  );
};

export default Home;
