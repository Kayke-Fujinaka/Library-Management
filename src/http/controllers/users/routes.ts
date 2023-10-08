import { FastifyInstance } from 'fastify';

import { deleteUser } from './delete';
import { listUsers } from './list-users';
import { registerUser } from './register';

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', registerUser);
  app.get('/', listUsers);
  app.delete('/', deleteUser);
}
