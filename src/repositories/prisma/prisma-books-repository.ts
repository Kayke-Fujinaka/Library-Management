import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { BooksRepository } from '../books-repository';

export class PrismaBooksRepository implements BooksRepository {
  async create(data: Prisma.BookCreateInput) {
    const book = await prisma.book.create({
      data,
    });

    return book;
  }
}
