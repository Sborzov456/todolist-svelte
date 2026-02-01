import express from 'express';
import mongoose from 'mongoose';
import { MONGO_DB_URL, PORT } from './consts.js';

const app = express();

mongoose.connect(MONGO_DB_URL);

app.get('/', (request, response) => {
  response.send('Express + TypeScript Server');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});