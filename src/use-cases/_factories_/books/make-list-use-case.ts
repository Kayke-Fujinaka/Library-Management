import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository';
import { ListBooksUseCase } from '@/use-cases/books';

export function makeListBooksUseCase() {
  const booksRepository = new PrismaBooksRepository();
  const useCase = new ListBooksUseCase(booksRepository);

  return useCase;
}
