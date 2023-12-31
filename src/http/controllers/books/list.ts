import { FastifyReply, FastifyRequest } from 'fastify';

import { makeListBooksUseCase } from '@/use-cases/_factories_';

export async function listBooks(_: FastifyRequest, reply: FastifyReply) {
  const useCase = makeListBooksUseCase();

  const { books } = await useCase.execute();

  return reply.status(200).send({ books });
}
