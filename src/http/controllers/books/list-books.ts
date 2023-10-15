import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository';
import { ListBooksUseCase } from '@/use-cases/list-books';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function listBooks(_: FastifyRequest, reply: FastifyReply) {
  const booksRepository = new PrismaBooksRepository();
  const useCase = new ListBooksUseCase(booksRepository);

  const { books } = await useCase.execute();

  return reply.status(200).send({ books });
}
