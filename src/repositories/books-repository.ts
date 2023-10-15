import { Book, Prisma } from '@prisma/client';

export interface BooksRepository {
  create(Data: Prisma.BookCreateInput): Promise<Book>;
  findMany(): Promise<Book[]>;
}
