import { BooksRepository } from '@/repositories/books-repository';
import {
  RegisterBookUseCase,
  RegisterBookUseCaseRequest,
} from './register-book';

describe('Register Book Use Case', () => {
  let sut: RegisterBookUseCase;
  let booksRepository: jest.Mocked<BooksRepository>;
  let bookData: RegisterBookUseCaseRequest;
  let createSpy: jest.SpyInstance;

  beforeEach(() => {
    booksRepository = {
      create: jest.fn(),
    } as unknown as jest.Mocked<BooksRepository>;

    createSpy = jest.spyOn(booksRepository, 'create');

    sut = new RegisterBookUseCase(booksRepository);

    bookData = {
      title: 'Lucíola',
      author: 'Aluísio Azevedo',
      publisher: 'Editora Intrínseca',
      release_year: 2016,
      price: 10.41,
      description:
        'O autor nos leva por uma viagem emocional, explorando os sentimentos e emoções mais profundos de seus personagens.',
      page_count: 834,
      cover_image: '',
      language: 'Português',
      genre: 'Ficção',
    };
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

  it('should be able to register a book', async () => {
    const result = await sut.execute(bookData);

    expect(result).toBeDefined();
    expect(createSpy).toHaveBeenCalledWith({
      title: bookData.title,
      author: bookData.author,
      publisher: bookData.publisher,
      isbn: expect.any(String),
      release_year: bookData.release_year,
      price: bookData.price,
      description: bookData.description,
      page_count: bookData.page_count,
      cover_image: bookData.cover_image,
      language: bookData.language,
      genre: bookData.genre,
    });
  });
});
