import { UsersRepository } from '@/repositories/users-repository';
import { ResourceNotFoundError } from '../_errors_/resource-not-found';

interface DeleteUserUseCaseRequest {
  id: string;
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: DeleteUserUseCaseRequest): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findById(id);

    if (!userAlreadyExists) throw new ResourceNotFoundError();

    return this.usersRepository.delete(id);
  }
}
