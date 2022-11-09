import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { loggerInfo, loggerError } from '../../config/log4.js';
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => loggerInfo.info('[Mongoose(MongoBD)] - Conectada'))
  .catch((err) => loggerError.error('[Mongoose(MongoBD)] - Error:', err.message));
