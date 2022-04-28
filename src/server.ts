import express, { Request, Response } from 'express';
import { errors } from 'celebrate';
import router from './routes';
import 'express-async-errors';
import 'reflect-metadata';

import AppError from './models/AppError';

import './datasource';

const app = express();
app.use(express.json());

app.use('/', router);

app.use(errors());

app.use((err: Error, req: Request, res: Response) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
