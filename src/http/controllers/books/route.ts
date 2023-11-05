import { FastifyInstance } from 'fastify';

import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { listBooks } from './list';
import { registerBook } from './register';

export async function booksRoutes(app: FastifyInstance) {
  app.get('/', listBooks);

  app.post('/', { onRequest: [verifyJWT] }, registerBook);
}
