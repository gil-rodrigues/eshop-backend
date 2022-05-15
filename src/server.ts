import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';
import 'reflect-metadata';

import './datasource';
import './container';

import AppError from './models/AppError';

import router from './routes';

const app = express();
app.use(express.json());

app.use(router);

app.use(errors());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  // eslint-disable-next-line no-console
  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server started on port 3333');
});
