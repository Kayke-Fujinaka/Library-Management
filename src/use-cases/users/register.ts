import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';

import { UsersRepository } from '@/repositories/users-repository';
import { UserAlreadyExistsError } from '../_errors_/user-already-exists';

export interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserUseCaseResponse {
  user: User;
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) throw new UserAlreadyExistsError();

    const password_hash = await bcrypt.hash(password, 6);

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
