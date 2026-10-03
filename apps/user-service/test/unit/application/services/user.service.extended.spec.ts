/**
 * UserService — extended (all methods)
 */
import { jest } from '@jest/globals';

import { UserService } from '@application/services/impl/user.service';
import { CreateUserCommand } from '@application/commands/user/create-user.command';
import { UpdateUserCommand } from '@application/commands/user/update-user.command';
import { DeleteUserCommand } from '@application/commands/user/delete-user.command';
import { ActivateUserCommand } from '@application/commands/user/activate-user.command';
import { DeactivateUserCommand } from '@application/commands/user/deactivate-user.command';
import { SuspendUserCommand } from '@application/commands/user/suspend-user.command';
import { UnsuspendUserCommand } from '@application/commands/user/unsuspend-user.command';
import { GetUserQuery } from '@application/queries/user/get-user.query';
import { GetUserByEmailQuery } from '@application/queries/user/get-user-by-email.query';
import { ListUsersQuery } from '@application/queries/user/list-users.query';
import { SearchUsersQuery } from '@application/queries/user/search-users.query';

describe('UserService — extended', () => {
  let service: UserService;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn().mockResolvedValue({ id: 'u-1' }) };
    queryBus = { execute: jest.fn().mockResolvedValue({ id: 'u-1' }) };
    service = new UserService(commandBus as never, queryBus as never);
  });

  it('findByEmail → GetUserByEmailQuery', async () => {
    await service.findByEmail('u@e.com');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetUserByEmailQuery));
  });

  it('update → UpdateUserCommand', async () => {
    await service.update('u-1', { username: 'x' });
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(UpdateUserCommand));
  });

  it('delete with hardDelete flag', async () => {
    await service.delete('u-1', true);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(DeleteUserCommand));
  });

  it('delete without hardDelete', async () => {
    await service.delete('u-1');
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(DeleteUserCommand));
  });

  it('activate → ActivateUserCommand', async () => {
    await service.activate('u-1');
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(ActivateUserCommand));
  });

  it('deactivate → DeactivateUserCommand', async () => {
    await service.deactivate('u-1', 'reason');
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(DeactivateUserCommand));
  });

  it('suspend → SuspendUserCommand', async () => {
    await service.suspend('u-1', 'reason');
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(SuspendUserCommand));
  });

  it('unsuspend → UnsuspendUserCommand', async () => {
    await service.unsuspend('u-1');
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(UnsuspendUserCommand));
  });

  it('search → SearchUsersQuery', async () => {
    queryBus.execute.mockResolvedValue({ items: [], total: 0, page: 1, limit: 20, totalPages: 0, term: 'x' });
    await service.search('john', 1, 20);
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(SearchUsersQuery));
  });

  it('list → ListUsersQuery', async () => {
    queryBus.execute.mockResolvedValue({ items: [], total: 0, page: 1, limit: 20, totalPages: 0 });
    await service.list(1, 20, 'active', 'individual', 'x');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListUsersQuery));
  });

  it('create → CreateUserCommand', async () => {
    await service.create({ email: 'u@e.com' } as never);
    expect(commandBus.execute).toHaveBeenCalledWith(expect.any(CreateUserCommand));
  });

  it('findById → GetUserQuery', async () => {
    await service.findById('u-1');
    expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetUserQuery));
  });
});
