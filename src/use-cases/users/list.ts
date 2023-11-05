import { User } from '@prisma/client';

import { UsersRepository } from '@/repositories/users-repository';

export type SanitizedUser = Omit<User, 'password_hash'>;

interface ListUsersUseCaseResponse {
  users: SanitizedUser[];
}

export class ListUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<ListUsersUseCaseResponse> {
    const users = await this.usersRepository.findMany();

    const sanitizedUsers = users.map((user) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password_hash, ...rest } = user;
      return rest;
    });

    return { users: sanitizedUsers };
  }
}
