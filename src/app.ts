import Fastify from 'fastify';
import { ZodError } from 'zod';

import { env } from '@/env';
import { prisma } from '@/lib/prisma';

export const app = Fastify({
  logger: true,
});

app.get('/', async (request, response) => {
  const users = await prisma.user.findMany();
  response.send({ users });
});

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Erro de validação.', issues: error.format() });
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error);
  } else {
    // TODO: Here we should log to on external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Erro interno no servidor.' });
});