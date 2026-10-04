/**
 * UserService (Application) Unit Test
 *
 * Verifies the service dispatches to CommandBus / QueryBus
 */
import { jest } from '@jest/globals';

import { UserService } from '@application/services/impl/user.service';
import { CreateUserCommand } from '@application/commands/user/create-user.command';
import { GetUserQuery } from '@application/queries/user/get-user.query';
import { ListUsersQuery } from '@application/queries/user/list-users.query';

describe('Application UserService', () => {
  let service: UserService;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    service = new UserService(commandBus as never, queryBus as never);
  });

  const sampleDto = { id: 'user-1', email: 'user@example.com' };

  it('findById → GetUserQuery', async () => {
    queryBus.execute.mockResolvedValue(sampleDto);
    const r = await service.findById('user-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetUserQuery));
    expect(r).toBe(sampleDto);
  });

  it('create → CreateUserCommand', async () => {
    commandBus.execute.mockResolvedValue(sampleDto);
    await service.create({ email: 'user@example.com' } as never);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(CreateUserCommand));
  });

  it('list → ListUsersQuery with page/limit', async () => {
    queryBus.execute.mockResolvedValue({ items: [], total: 0 });
    await service.list(1, 20);
    const arg = queryBus.execute.mock.calls[0][0] as ListUsersQuery;
    expect(arg.page).toBe(1);
    expect(arg.limit).toBe(20);
  });

  it('delete → DeleteUserCommand', async () => {
    commandBus.execute.mockResolvedValue({ success: true });
    await service.delete('user-1');
    expect(commandBus.execute).toHaveBeenCalled();
  });

  it('suspend → SuspendUserCommand', async () => {
    commandBus.execute.mockResolvedValue(sampleDto);
    await service.suspend('user-1', 'test');
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
