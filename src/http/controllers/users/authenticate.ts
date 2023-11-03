/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateUseCase } from '@/use-cases/authenticate';
import { customString } from '@/utils/zodCustom';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: customString('email')
      .nonempty('O e-mail não pode estar vazio.')
      .email('E-mail inválido.'),
    password: customString('senha'),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const useCase = new AuthenticateUseCase(usersRepository);

    await useCase.execute({ email, password });
  } catch (error: any) {
    return reply.status(409).send({ message: error.message });
  }

  return reply.status(200).send();
}
