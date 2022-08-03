import type { NextApiRequest, NextApiResponse } from "next";

interface Restaurant {
  name: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Restaurant>
) {
  res.status(200).json({ name: "John Doe" });
}
