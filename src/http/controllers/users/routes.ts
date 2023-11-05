import { FastifyInstance } from 'fastify';

import { authenticate } from './authenticate';
import { deleteUser } from './delete';
import { listUsers } from './list';
import { refresh } from './refresh';
import { registerUser } from './register';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', registerUser);
  app.post('/session', authenticate);

  app.patch('/token/refresh', refresh);

  app.get('/', listUsers);
  app.delete('/', deleteUser);
}
