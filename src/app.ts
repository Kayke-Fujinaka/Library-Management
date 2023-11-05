import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';
import Fastify from 'fastify';
import { ZodError } from 'zod';

import { env } from '@/env';
import { booksRoutes } from './http/controllers/books/route';
import { healthRoutes } from './http/controllers/health/routes';
import { usersRoutes } from './http/controllers/users/routes';

export const app = Fastify({
  logger: true,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
});

app.register(fastifyCookie);

app.register(healthRoutes, { prefix: '/health' });
app.register(usersRoutes, { prefix: '/users' });
app.register(booksRoutes, { prefix: '/books' });

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
