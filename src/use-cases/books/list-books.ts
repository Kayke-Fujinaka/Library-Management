import { Book } from '@prisma/client';

import { BooksRepository } from '@/repositories/books-repository';

interface ListBooksUseCaseResponse {
  books: Book[];
}

export class ListBooksUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute(): Promise<ListBooksUseCaseResponse> {
    const books = await this.booksRepository.findMany();

    return { books };
  }
}
