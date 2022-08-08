# OnlyFoods - a food search app 

Simple app that allows you to search for restaurants in the country 🍔🍜

**Built with**
* [Next.js](https://nextjs.org/)
* [ChakraUI](https://chakra-ui.com/)
* [Zustand](https://github.com/pmndrs/zustand)
* [Tailwind](https://tailwindcss.com/)
* [Yelp API](https://www.yelp.com/developers/documentation/v3/get_started)

Try the app [here! 🥤](https://onlyfoods-blue.vercel.app/)

## How it works

Type in the name of a food to search for, and a list of relevant restaurants will be returned.

You can sort the results by price and ratings.

## Landing Page

![image](https://user-images.githubusercontent.com/48670655/183424382-1269c372-68e9-4173-aa13-07beb41f1139.png)

## Search results
![image](https://user-images.githubusercontent.com/48670655/183298143-f9f66bf0-91d0-4423-9af1-d7b888bf0917.png)

## Static Site Generation

Pages are server-rendered on the first request with fallback: "true" / "blocking", 

Future requests will serve the static file from the cache.

```jsx

export const getStaticPaths = async () => {
  const paths = foodData.map((food) => {
    return {
      params: {
        food: food.name,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

```

```jsx

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext) => {
  const { food } = params!;

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.YELP_APIKEY}`,
    },
  };

  const response = await fetch(
    `https://api.yelp.com/v3/businesses/search?location=singapore&term=food_${food}`,
    config
  );

  if (!response.ok) {
    return {
      throw new Error("Failed to fetch restaurants");
    };
  }

  const data = await response.json();

  const restaurants: Restaurant[] = data.businesses;

  return {
    props: {
      restaurants,
    },
  };
};

```
