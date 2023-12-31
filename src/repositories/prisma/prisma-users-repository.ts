import { Prisma } from '@prisma/client';

import { prisma } from '@/lib/prisma';
import { UsersRepository } from '../users-repository';

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id, deleted_at: null },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: { email, deleted_at: null },
    });

    return user;
  }

  async findMany() {
    const users = await prisma.user.findMany({ where: { deleted_at: null } });

    return users;
  }

  async delete(id: string) {
    return prisma.user.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
