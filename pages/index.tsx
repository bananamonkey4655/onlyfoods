import {
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import React, { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import { foodData } from "../utils/foodImages";
import { getRandomItemFromArray } from "../utils";

const Home: NextPage = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const randomFoodData = getRandomItemFromArray(foodData);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    router.push(`/eat/${query}`);

    setQuery("");
  };

  return (
    <>
      <Head>
        <title>OnlyFoods</title>
        <meta
          name="description"
          content="A website that helps you search for food in Singapore"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col lg:flex-row lg:gap-36 flex-auto justify-center items-center px-8">
        <section className="flex-col">
          <Heading>
            Find <span className="text-red-500">tasty</span> food you love
          </Heading>
          <form className="py-3" onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                value={query}
                onChange={handleChange}
                placeholder="pancakes, sushi, etc."
              />
              <InputRightElement
                color="gray.300"
                fontSize="1.2em"
                onClick={handleSubmit}
              >
                <IconButton
                  colorScheme="gray"
                  aria-label="Search database"
                  icon={<Search2Icon />}
                />
              </InputRightElement>
            </InputGroup>
          </form>
        </section>
        <section className="w-full lg:w-auto flex justify-center items-center cursor-pointer">
          <Image
            src={randomFoodData?.image!}
            width="500"
            height="400"
            alt="Food. Yum!"
            onClick={() => router.push(`/eat/${randomFoodData?.name!}`)}
          />
        </section>
      </main>
    </>
  );
};

export default Home;
