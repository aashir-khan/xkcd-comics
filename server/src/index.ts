import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createProxyMiddleware, RequestHandler } from 'http-proxy-middleware';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(morgan('dev'));
app.use(cors());

app.get('/', (_, res) => {
  res.send('Hello World');
});

app.use(
  '/api/proxy/xkcd',
  createProxyMiddleware({
    target: `https://xkcd.com`,
    changeOrigin: true,
    pathRewrite: {
      ['^/api/proxy/xkcd']: '',
    },
  })
);

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
