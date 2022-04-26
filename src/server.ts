import express from 'express';
import router from './routes';
import 'reflect-metadata';

import './datasource';

const app = express();
app.use(express.json());

app.use('/', router);

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
