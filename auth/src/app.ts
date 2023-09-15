import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import router from './routes';
import { errorHandler, NotFoundError } from '@schattenbrottv/common';
import cookieSession from 'cookie-session';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use('/api/users', router);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
