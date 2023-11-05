/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { RegisterUserUseCase } from '@/use-cases/users/register-user';
import { passwordValidation } from '@/utils/validation';
import { customString } from '@/utils/zodCustom';

export async function registerUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: customString('nome')
      .nonempty('O nome não pode estar vazio.')
      .refine((name) => /^[a-zA-Z\s]*$/.test(name), {
        message: 'O nome não pode conter caracteres especiais ou números.',
        path: ['name'],
      }),
    email: customString('e-mail')
      .nonempty('O e-mail não pode estar vazio.')
      .email('E-mail inválido.'),
    password: passwordValidation,
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    const useCase = new RegisterUserUseCase(usersRepository);

    await useCase.execute({ name, email, password });
  } catch (error: any) {
    return reply.status(409).send({ message: error.message });
  }

  return reply.status(201).send();
}
