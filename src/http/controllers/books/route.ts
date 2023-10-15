import { FastifyInstance } from 'fastify';
import { registerBook } from './register';
import { listBooks } from './list-books';

export async function booksRoutes(app: FastifyInstance) {
  app.post('/', registerBook);
  app.get('/', listBooks);
}
