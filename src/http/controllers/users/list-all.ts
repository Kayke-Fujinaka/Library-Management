/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify';

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { FetchUsersUseCase } from '@/use-cases/fetch-users';

export async function listAll(_: FastifyRequest, reply: FastifyReply) {
  try {
    const usersRepository = new PrismaUsersRepository();
    const useCase = new FetchUsersUseCase(usersRepository);

    await useCase.execute();
  } catch (error: any) {
    return reply.status(409).send({ message: error.message });
  }
}
