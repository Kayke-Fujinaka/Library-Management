import { Book } from '@prisma/client';

import { BooksRepository } from '@/repositories/books-repository';

interface RegisterBookUseCaseRequest {
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  release_year: number;
  price: number;
  description: string;
  page_count: number;
  cover_image?: string;
  language: string;
  genre: string;
}

interface RegisterBookUseCaseResponse {
  book: Book;
}

export class RegisterBookUseCase {
  constructor(private booksRepository: BooksRepository) {}

  async execute({
    title,
    author,
    isbn,
    publisher,
    release_year,
    price,
    description,
    page_count,
    cover_image,
    language,
    genre,
  }: RegisterBookUseCaseRequest): Promise<RegisterBookUseCaseResponse> {
    // Validar se livro já existe

    const book = await this.booksRepository.create({
      title,
      author,
      isbn,
      publisher,
      release_year,
      price,
      description,
      page_count,
      cover_image,
      language,
      genre,
    });

    return { book };
  }
}
