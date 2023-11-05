import { User } from '@prisma/client';

import { UsersRepository } from '@/repositories/users-repository';
import { ResourceNotFoundError } from '../_errors_/resource-not-found';
import { DeleteUserUseCase } from './delete';

describe('Delete User Use Case', () => {
  let sut: DeleteUserUseCase;
  let usersRepository: UsersRepository;
  let deleteSpy: jest.SpyInstance;
  let findByIdSpy: jest.SpyInstance;

  beforeAll(async () => {
    usersRepository = {
      delete: jest.fn(),
      findById: jest.fn(),
    } as unknown as jest.Mocked<UsersRepository>;

    deleteSpy = jest.spyOn(usersRepository, 'delete');
    findByIdSpy = jest.spyOn(usersRepository, 'findById');

    sut = new DeleteUserUseCase(usersRepository);
  });

  const user: User = {
    id: '9029a95c-c611-4a4a-8f6f-52350f7ab6ac',
    name: 'John Doe',
    email: 'johndoe@example.com',
    password_hash: 'hashed_password',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  };

  it('should be defined', () => {
    expect(usersRepository).toBeDefined();
    expect(findByIdSpy).toBeDefined();
    expect(deleteSpy).toBeDefined();
  });

  it('should be able to delete an user', async () => {
    findByIdSpy.mockResolvedValue(user);

    await sut.execute({ id: user.id });

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith(user.id);

    expect(deleteSpy).toHaveBeenCalledTimes(1);
    expect(deleteSpy).toHaveBeenCalledWith(user.id);
  });

  it('should not be able to delete an user with inexistent id', async () => {
    const inexistentUserId = 'inexistent-user-id';

    findByIdSpy.mockResolvedValue(null);

    await expect(sut.execute({ id: inexistentUserId })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    );

    expect(findByIdSpy).toHaveBeenCalledTimes(1);
    expect(findByIdSpy).toHaveBeenCalledWith(inexistentUserId);
  });
});
