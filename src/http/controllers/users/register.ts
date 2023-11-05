/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { UserAlreadyExistsError } from '@/use-cases/_errors_/user-already-exists';
import { makeRegisterUserUseCase } from '@/use-cases/_factories_/users/make-register-use-case';
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
    const useCase = makeRegisterUserUseCase();

    await useCase.execute({ name, email, password });
  } catch (error: any) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(201).send();
}
