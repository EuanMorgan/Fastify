import mongoose from 'mongoose';
import {config} from './config';
import logger from './logger';

export async function connectToDb() {
  try {
    logger.info('connecting...');
    await mongoose.connect(config.DATABASE_URL);
    logger.info({DATABASE_URL: config.DATABASE_URL}, 'Connected to database');
  } catch (error) {
    logger.error(error, 'Error connecting to database');
    process.exit(1);
  }
}

export function disconnectFromDb() {
  return mongoose.connection.close();
}
