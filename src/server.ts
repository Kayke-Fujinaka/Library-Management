import 'dotenv/config';
import Fastify from 'fastify';

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

const fastify = Fastify({
  logger: true,
});

fastify.get('/', (request, response) => {
  response.send({ hello: 'world' });
});

fastify.listen({ port, host }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
