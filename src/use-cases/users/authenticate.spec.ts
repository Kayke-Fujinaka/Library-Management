import bcrypt from 'bcryptjs';

import { UsersRepository } from '@/repositories/users-repository';
import { AuthenticateUseCase } from './authenticate';

describe('Authenticate Use Case', () => {
  let sut: AuthenticateUseCase;
  let usersRepository: jest.Mocked<UsersRepository>;
  let findByEmailSpy: jest.SpyInstance;
  let compareSpy: jest.SpyInstance;
  let userData: { email: string; password: string };

  beforeEach(() => {
    usersRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    } as unknown as jest.Mocked<UsersRepository>;

    findByEmailSpy = jest.spyOn(usersRepository, 'findByEmail');
    compareSpy = jest.spyOn(bcrypt, 'compare');

    sut = new AuthenticateUseCase(usersRepository);

    userData = {
      email: 'johndoe@example.com',
      password: 'password',
    };
  });

  it('should be defined', () => {
    expect(usersRepository).toBeDefined();
    expect(findByEmailSpy).toBeDefined();
    expect(compareSpy).toBeDefined();
  });

  it('should be able to authenticate a user', async () => {
    findByEmailSpy.mockResolvedValue({
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: 'hashed_password',
    });

    compareSpy.mockResolvedValue(true);

    const result = await sut.execute(userData);

    expect(result).toBeDefined();
    expect(findByEmailSpy).toHaveBeenCalledWith(userData.email);
    expect(compareSpy).toHaveBeenCalledWith(
      userData.password,
      'hashed_password',
    );
  });

  it('should not be able to authenticate with incorrect email', async () => {
    findByEmailSpy.mockResolvedValue(null);

    await expect(sut.execute(userData)).rejects.toThrowError(
      'Credenciais inválidas.',
    );

    expect(findByEmailSpy).toHaveBeenCalledWith(userData.email);
  });

  it('should not be able to authenticate with incorrect password', async () => {
    findByEmailSpy.mockResolvedValue({
      id: '1',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: 'hashed_password',
    });

    compareSpy.mockResolvedValue(false);

    await expect(sut.execute(userData)).rejects.toThrowError(
      'Credenciais inválidas.',
    );

    expect(findByEmailSpy).toHaveBeenCalledWith(userData.email);
    expect(compareSpy).toHaveBeenCalledWith(
      userData.password,
      'hashed_password',
    );
  });
});
