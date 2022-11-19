import fastify from 'fastify';
import {config} from './config';
import {envToLogger} from './logger';

export const createServer = async () => {
  const app = fastify({
    logger: envToLogger[config.NODE_ENV],
  });

  return app;
};
