import { PrismaBooksRepository } from '@/repositories/prisma/prisma-books-repository';
import { RegisterBookUseCase } from '@/use-cases/books';

export function makeRegisterBookUseCase() {
  const booksRepository = new PrismaBooksRepository();
  const useCase = new RegisterBookUseCase(booksRepository);

  return useCase;
}
