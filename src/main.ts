import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import logger from './utils/logger';
import { CORS_ORIGIN } from './constants';
import userRoute from './modules/user/user.routes';
import authRoute from './modules/auth/auth.routes';
import deserializeUser from './middleware/deserializeUser';
import { connectDb, disconnectDb } from './utils/db';

const port = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(helmet());
app.use(deserializeUser);

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

const server = app.listen(port, async () => {
  await connectDb();
  logger.info(`Server running on port ${port}.`);
});

const signals = [' SIGINT', 'SIGTERM'];

const shutdown = (signal: string) => {
  process.on(signal, async () => {
    server.close();
    await disconnectDb();
    logger.info(`My work here is done. ${signal} received.`);
    process.exit(0);
  });
};

for (let index = 0; index < signals.length; index++) {
  shutdown(signals[index]);
}
