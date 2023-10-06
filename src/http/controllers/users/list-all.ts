/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify';

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { FetchUsersUseCase } from '@/use-cases/fetch-users';

export async function listAll(_: FastifyRequest, reply: FastifyReply) {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new FetchUsersUseCase(usersRepository);

  const { users } = await useCase.execute();

  return reply.status(200).send({ users });
}
