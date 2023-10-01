import Fastify from 'fastify';
import { ZodError } from 'zod';

import { env } from '@/env';

export const app = Fastify({
  logger: true,
});

app.get('/', (request, response) => {
  response.send({ hello: 'world' });
});

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // TODO: Here we should log to on external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' });
});
