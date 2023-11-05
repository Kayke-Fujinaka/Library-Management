/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeDeleteUserUseCase } from '@/use-cases/_factories_/users/make-delete-use-case';
import { customUUID } from '@/utils/zodCustom';

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
  const deleteUserQuerySchema = z.object({
    id: customUUID('id'),
  });

  const { id } = deleteUserQuerySchema.parse(request.query);

  try {
    const useCase = makeDeleteUserUseCase();

    await useCase.execute({ id });
  } catch (error: any) {
    return reply.status(404).send({ message: error.message });
  }

  return reply.status(204).send();
}
