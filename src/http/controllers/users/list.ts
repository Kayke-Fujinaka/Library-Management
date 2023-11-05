/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify';

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { ListUsersUseCase } from '@/use-cases/users';

export async function listUsers(_: FastifyRequest, reply: FastifyReply) {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new ListUsersUseCase(usersRepository);

  const { users } = await useCase.execute();

  return reply.status(200).send({ users });
}
