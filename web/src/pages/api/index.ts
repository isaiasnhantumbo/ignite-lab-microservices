import { getAccessToken } from "@auth0/nextjs-auth0";
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { accessToken } = await getAccessToken(req, res);
  return httpProxyMiddleware(req, res, {
    target: "http://localhost:4444/graphql",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
