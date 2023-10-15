import { FastifyInstance } from 'fastify';
import { registerBook } from './register';

export async function booksRoutes(app: FastifyInstance) {
  app.post('/', registerBook);
}
