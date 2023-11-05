import { UsersRepository } from '@/repositories/users-repository';
import { ListUsersUseCase, SanitizedUser } from './list';

describe('List Users Use Case', () => {
  let sut: ListUsersUseCase;
  let usersRepository: jest.Mocked<UsersRepository>;
  let findManySpy: jest.SpyInstance;

  beforeAll(async () => {
    usersRepository = {
      findMany: jest.fn(),
    } as unknown as jest.Mocked<UsersRepository>;

    findManySpy = jest.spyOn(usersRepository, 'findMany');

    sut = new ListUsersUseCase(usersRepository);
  });

  const user: SanitizedUser = {
    id: '9029a95c-c611-4a4a-8f6f-52350f7ab6ac',
    name: 'John Doe',
    email: 'johndoe@example.com',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  };

  it('should be defined', () => {
    expect(usersRepository).toBeDefined();
    expect(findManySpy).toBeDefined();
  });

  it('should be able to return all users', async () => {
    const users = [user];

    findManySpy.mockResolvedValue(users);

    const result = await sut.execute();

    expect(findManySpy).toHaveBeenCalledTimes(1);

    expect(result.users).toEqual(users);
  });

  it('should be able to return no users', async () => {
    findManySpy.mockResolvedValue([]);

    const result = await sut.execute();

    expect(findManySpy).toHaveBeenCalledTimes(1);

    expect(result.users).toEqual([]);
  });
});
