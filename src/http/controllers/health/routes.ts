import { FastifyInstance } from 'fastify';

import { health } from './health';

export async function healthRoutes(app: FastifyInstance) {
  app.get('/', health);
}
