import { Book, Prisma } from '@prisma/client';

import { BooksRepository } from '@/repositories/books-repository';
import { ListBooksUseCase } from './list-books';

describe('List Books Use Case', () => {
  let sut: ListBooksUseCase;
  let booksRepository: jest.Mocked<BooksRepository>;
  let findManySpy: jest.SpyInstance;

  beforeAll(async () => {
    booksRepository = {
      findMany: jest.fn(),
    } as unknown as jest.Mocked<BooksRepository>;

    findManySpy = jest.spyOn(booksRepository, 'findMany');

    sut = new ListBooksUseCase(booksRepository);
  });

  const book: Book = {
    id: '71774745-4c74-4776-94e1-7d7345bda61d',
    title: 'Lucíola',
    author: 'Aluísio Azevedo',
    isbn: '6816088649016',
    publisher: 'Editora Intrínseca',
    release_year: 2016,
    price: new Prisma.Decimal('10.41'),
    description:
      'O autor nos leva por uma viagem emocional, explorando os sentimentos e emoções mais profundos de seus personagens.',
    page_count: 834,
    cover_image: null,
    language: 'Português',
    genre: 'Ficção',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
    user_id: null,
  };

  it('should be defined', () => {
    expect(booksRepository).toBeDefined();
    expect(findManySpy).toBeDefined();
  });

  it('should be able to return all books', async () => {
    const books = [book];

    findManySpy.mockResolvedValue(books);

    const result = await sut.execute();

    expect(findManySpy).toHaveBeenCalledTimes(1);

    expect(result.books).toEqual(books);
  });

  it('should be able to return no books', async () => {
    findManySpy.mockResolvedValue([]);

    const result = await sut.execute();

    expect(findManySpy).toHaveBeenCalledTimes(1);

    expect(result.books).toEqual([]);
  });
});
