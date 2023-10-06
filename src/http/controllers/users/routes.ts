import { FastifyInstance } from 'fastify';

import { listAll } from './list-all';
import { register } from './register';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.get('/users', listAll);
}
