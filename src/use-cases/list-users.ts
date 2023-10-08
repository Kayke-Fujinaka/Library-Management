import { User } from '@prisma/client';

import { UsersRepository } from '@/repositories/users-repository';

interface ListUsersUseCaseResponse {
  users: User[];
}

export class ListUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<ListUsersUseCaseResponse> {
    const users = await this.usersRepository.findMany();

    return { users };
  }
}
