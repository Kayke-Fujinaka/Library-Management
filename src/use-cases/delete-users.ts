import { UsersRepository } from '@/repositories/users-repository';

interface DeleteUserUseCaseRequest {
  id: string;
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: DeleteUserUseCaseRequest): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findById(id);

    if (!userAlreadyExists) throw new Error('User does not exists.');

    return this.usersRepository.delete(id);
  }
}
