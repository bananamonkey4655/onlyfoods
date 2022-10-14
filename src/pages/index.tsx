import {
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

import React, { useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

import { getRandomItemFromArray } from "@/utils";
import { foodData } from "@/utils/foodData";

const Home: NextPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [currentFood, setCurrentFood] = useState(() =>
    getRandomItemFromArray(foodData)
  );

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent, food?: string) => {
    event.preventDefault();
    setIsLoading(true);

    if (food) {
      router.push(`/eat/${food}`);
      return;
    }

    if (!query) {
      console.log(query);
      return;
    }

    router.push(`/eat/${query}`);
    setQuery("");
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentFood(getRandomItemFromArray(foodData));
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      <Head>
        <title>OnlyFoods</title>
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          name="description"
          content="Search for your favourite foods in Singapore!"
        />
        <meta property="og:title" content="OnlyFoods" />
        <meta
          property="og:description"
          content="A website to help you search for your favourite foods in Singapore!"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://onlyfoods-blue.vercel.app" />
        <meta property="og:image" content="/api/og" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col lg:flex-row lg:gap-36 flex-auto justify-center items-center px-8">
        <section className="flex-col">
          <Heading>
            Find{" "}
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
              tasty
            </span>{" "}
            food you love
          </Heading>
          <form className="py-3" onSubmit={handleSubmit}>
            <InputGroup>
              <Input
                value={query}
                onChange={handleChange}
                placeholder="noodles, sushi, etc."
              />
              <InputRightElement
                color="gray.300"
                fontSize="1.2em"
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <Spinner label="loading..." size="sm" />
                ) : (
                  <IconButton
                    colorScheme="gray"
                    aria-label="Search database"
                    icon={<Search2Icon />}
                  />
                )}
              </InputRightElement>
            </InputGroup>
          </form>
        </section>
        <section className="w-full lg:w-auto flex justify-center items-center cursor-pointer">
          <Image
            src={currentFood?.image!}
            width="500"
            height="400"
            alt="Food. Yum!"
            onClick={(event) => handleSubmit(event, currentFood?.name)}
            priority
          />
        </section>
      </main>
    </>
  );
};

export default Home;
