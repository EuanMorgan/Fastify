import {config} from './utils/config';
import {createServer} from './utils/createServer';
import {connectToDb, disconnectFromDb} from './utils/db';
import logger from './utils/logger';

// We do as const here to force TypeScript to infer the type of signals as
// readonly string[] instead of string[].
const signals = ['SIGINT', 'SIGTERM', 'SIGQUIT'] as const;

async function gracefulShutdown({
  signal,
  server,
}: {
  signal: typeof signals[number];
  server: Awaited<ReturnType<typeof createServer>>;
}) {
  await server.close();
  logger.info(`Got signal ${signal}, goodbye`);
  await disconnectFromDb();
  process.exit(0);
}

const startServer = async () => {
  const server = await createServer();

  server.listen({
    port: config.PORT,
    host: config.HOST,
  });

  await connectToDb();

  for (let i = 0; i < signals.length; i++) {
    process.on(signals[i], () =>
      gracefulShutdown({signal: signals[i], server})
    );
  }
};

startServer();
