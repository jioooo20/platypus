import { buildServer } from './server.js';

const app = buildServer();
const port = Number(process.env.PORT ?? 3001);
try {
  await app.listen({ port, host: process.env.HOST ?? '0.0.0.0' });
} catch (error) {
  app.log.error(error);
  process.exitCode = 1;
}
