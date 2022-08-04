import {
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import React, { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    router.push(`/eat/${query}`);

    setQuery("");
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container centerContent>
        <Heading>Find tasty food you love</Heading>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Input value={query} onChange={handleChange} placeholder="Search" />
            <InputRightElement
              children={
                <IconButton
                  colorScheme="gray"
                  aria-label="Search database"
                  icon={<Search2Icon />}
                />
              }
              color="gray.300"
              fontSize="1.2em"
            />
          </InputGroup>
        </form>
      </Container>
    </div>
  );
};

export default Home;
