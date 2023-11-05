/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify';

export async function health(_: FastifyRequest, reply: FastifyReply) {
  return reply
    .status(200)
    .send({ status: 'ok', timestamp: new Date().toISOString() });
}
