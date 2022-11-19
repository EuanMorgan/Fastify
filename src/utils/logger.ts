import pino from 'pino';
import {config} from './config';

export const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
};

const logger = pino(envToLogger['development']);

export default logger;
