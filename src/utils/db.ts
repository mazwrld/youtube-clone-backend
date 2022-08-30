import mongoose from 'mongoose';
import logger from './logger';

const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/youtube-clone';

export const connectDb = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);
    logger.info(`Connected to ${DB_CONNECTION_STRING}`);
  } catch (error) {
    logger.error(error, 'Error connecting to database');
    process.exit(1);
  }
};

export const disconnectDb = async () => {
  await mongoose.disconnect();
  logger.info('Disconnected from database');
};
