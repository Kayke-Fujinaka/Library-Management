/* eslint-disable @typescript-eslint/no-explicit-any */
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { AuthenticateUseCase } from '@/use-cases/users/authenticate';
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

    const { user } = await useCase.execute({ email, password });

    const token = await reply.jwtSign({
      sign: {
        sub: user.id,
      },
    });

    const refreshToken = await reply.jwtSign({
      sign: {
        sub: user.id,
        expiresIn: '7d',
      },
    });

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token });
  } catch (error: any) {
    return reply.status(409).send({ message: error.message });
  }
}
