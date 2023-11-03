import { FastifyInstance } from 'fastify';

import { authenticate } from './authenticate';
import { deleteUser } from './delete';
import { listUsers } from './list';
import { registerUser } from './register';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate);
  app.post('/', registerUser);
  app.get('/', listUsers);
  app.delete('/', deleteUser);
}
