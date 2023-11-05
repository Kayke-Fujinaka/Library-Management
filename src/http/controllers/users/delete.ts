/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { DeleteUserUseCase } from '@/use-cases/users/delete-user';
import { customUUID } from '@/utils/zodCustom';

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const deleteUserQuerySchema = z.object({
    id: customUUID('id'),
  });

  const { id } = deleteUserQuerySchema.parse(request.query);

  try {
    const usersRepository = new PrismaUsersRepository();
    const useCase = new DeleteUserUseCase(usersRepository);

    await useCase.execute({ id });
  } catch (error: any) {
    return reply.status(404).send({ message: error.message });
  }

  return reply.status(204).send();
}
