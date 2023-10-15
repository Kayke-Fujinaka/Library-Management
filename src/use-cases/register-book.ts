import { Book } from '@prisma/client';

import { BooksRepository } from '@/repositories/books-repository';

export interface RegisterBookUseCaseRequest {
  title: string;
  author: string;
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

  public generateISBN(): string {
    const isbnPrefix = '978';

    const generatedDigits = Array.from({ length: 9 }, () =>
      Math.floor(Math.random() * 10),
    ).join('');

    const combinedDigits = isbnPrefix + generatedDigits;

    let checksumTotal = 0;

    combinedDigits.split('').forEach((digit, position) => {
      const numericValue = parseInt(digit, 10);

      checksumTotal += position % 2 === 0 ? numericValue : numericValue * 3;
    });

    const checksumRemainder = checksumTotal % 10;
    const validationDigit = ((10 - checksumRemainder) % 10).toString();

    return combinedDigits + validationDigit;
  }

  async execute({
    title,
    author,
    publisher,
    release_year,
    price,
    description,
    page_count,
    cover_image,
    language,
    genre,
  }: RegisterBookUseCaseRequest): Promise<RegisterBookUseCaseResponse> {
    const book = await this.booksRepository.create({
      title,
      author,
      isbn: this.generateISBN(),
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
