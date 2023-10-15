import { BooksRepository } from '@/repositories/books-repository';
import { RegisterBookUseCase } from './register-book';

describe('Register Book Use Case', () => {
  let sut: RegisterBookUseCase;
  let booksRepository: jest.Mocked<BooksRepository>;
  let createSpy: jest.SpyInstance;

  beforeEach(() => {
    booksRepository = {
      create: jest.fn(),
    } as unknown as jest.Mocked<BooksRepository>;

    createSpy = jest.spyOn(booksRepository, 'create');

    sut = new RegisterBookUseCase(booksRepository);
  });

  describe('generateISBN', () => {
    it('should generate a valid ISBN of 13 characters', () => {
      const isbn = sut.generateISBN();

      expect(isbn).toHaveLength(13);
    });

    it('should start with prefix 978', () => {
      const isbn = sut.generateISBN();

      expect(isbn.startsWith('978')).toBe(true);
    });
  });

  it('should be defined', () => {
    expect(booksRepository).toBeDefined();
    expect(createSpy).toBeDefined();
  });
});
