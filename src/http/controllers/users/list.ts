/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify';

import { makeListUsersUseCase } from '@/use-cases/_factories_';

export async function listUsers(_: FastifyRequest, reply: FastifyReply) {
  const useCase = makeListUsersUseCase();

  const { users } = await useCase.execute();

  return reply.status(200).send({ users });
}
