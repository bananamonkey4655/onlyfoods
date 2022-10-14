import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "experimental-edge",
};

export default function handler(req) {
  return new ImageResponse(
    (
      <div tw="flex items-center bg-gray-50 h-full w-full">
        <div tw="bg-gray-50 flex">
          <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
            <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
              <span>OnlyFoods</span>
              <div tw="flex">
                <span tw="text-red-600 pr-5">Find your favourite treats</span>
                <span>🍔 🍉 🧉</span>
              </div>
            </h2>
          </div>
        </div>
      </div>
    )
  );
}
