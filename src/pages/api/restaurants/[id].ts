import type { NextApiRequest, NextApiResponse } from "next";
import { Restaurant } from "@/utils/types";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Restaurant>
) => {
  //TODO: proper error handling
  const { id } = req.query;

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.YELP_APIKEY}`,
    },
  };
  const response = await fetch(
    `https://api.yelp.com/v3/businesses/${id}`,
    config
  );

  const data: Restaurant = await response.json();

  res.status(200).json(data);
};

export default handler;
