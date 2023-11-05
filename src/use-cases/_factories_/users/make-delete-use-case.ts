import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { DeleteUserUseCase } from '@/use-cases/users';

export function makeDeleteUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new DeleteUserUseCase(usersRepository);

  return useCase;
}
