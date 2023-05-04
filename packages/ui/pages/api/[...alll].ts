import httpProxyMiddleware from 'next-http-proxy-middleware';
import { NextApiRequest, NextApiResponse } from 'next';

const DS_HOST = process.env.DS_HOST || 'localhost';

export default (req: NextApiRequest, res: NextApiResponse) =>
  httpProxyMiddleware(req, res, {
    target: `http://${DS_HOST}:4000`,
    pathRewrite: {
      '^/api/graphql': '/api/graphql',
      '^/api': '',
    },
    changeOrigin: true,
  });
