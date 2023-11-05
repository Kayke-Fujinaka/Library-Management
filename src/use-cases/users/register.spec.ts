import bcrypt from 'bcryptjs';

import { UsersRepository } from '@/repositories/users-repository';
import { RegisterUserUseCase, RegisterUserUseCaseRequest } from './register';

describe('Register User Use Case', () => {
  let sut: RegisterUserUseCase;
  let usersRepository: jest.Mocked<UsersRepository>;
  let findByEmailSpy: jest.SpyInstance;
  let createSpy: jest.SpyInstance;
  let userData: RegisterUserUseCaseRequest;
  let bcryptHashSpy: jest.SpyInstance;

  beforeEach(() => {
    usersRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<UsersRepository>;

    findByEmailSpy = jest.spyOn(usersRepository, 'findByEmail');
    createSpy = jest.spyOn(usersRepository, 'create');
    bcryptHashSpy = jest.spyOn(bcrypt, 'hash');

    sut = new RegisterUserUseCase(usersRepository);

    findByEmailSpy.mockResolvedValue(null);
    bcryptHashSpy.mockResolvedValue('hashed_password');
    createSpy.mockResolvedValue({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: 'hashed_password',
    });

    userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
    };
  });

  it('should be defined', () => {
    expect(usersRepository).toBeDefined();
    expect(findByEmailSpy).toBeDefined();
    expect(bcryptHashSpy).toBeDefined();
  });

  it('should be able to register an user', async () => {
    const result = await sut.execute(userData);

    expect(result).toBeDefined();
    expect(findByEmailSpy).toHaveBeenCalledWith(userData.email);
    expect(bcryptHashSpy).toHaveBeenCalledWith(userData.password, 6);
    expect(createSpy).toHaveBeenCalledWith({
      name: userData.name,
      email: userData.email,
      password_hash: 'hashed_password',
    });
  });

  it('should not be able to register an user with an existing email', async () => {
    findByEmailSpy.mockResolvedValue({
      name: 'Jane Doe',
      email: 'johndoe@example.com',
      password_hash: 'existing_hashed_password',
    });

    await expect(sut.execute(userData)).rejects.toThrowError(
      'E-mail já registrado.',
    );

    expect(findByEmailSpy).toHaveBeenCalledWith(userData.email);
  });
});
