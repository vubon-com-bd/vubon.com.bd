/**
 * UserController Unit Test
 */
import { jest } from '@jest/globals';

import { UserController } from '@interfaces/controllers/rest/user.controller';
import type { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '@application/commands/user/create-user.command';
import { GetUserQuery } from '@application/queries/user/get-user.query';
import { ListUsersQuery } from '@application/queries/user/list-users.query';

describe('UserController', () => {
  let controller: UserController;
  let commandBus: { execute: jest.Mock };
  let queryBus: { execute: jest.Mock };

  beforeEach(() => {
    commandBus = { execute: jest.fn() };
    queryBus = { execute: jest.fn() };
    controller = new UserController(
      commandBus as unknown as CommandBus,
      queryBus as unknown as QueryBus
    );
  });

  const sampleUserDto = {
    id: 'user-1',
    email: 'user@example.com',
    status: 'active',
    type: 'individual',
    roles: [],
    emailVerified: true,
    phoneVerified: false,
    isMfaEnabled: false,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  };

  describe('findById', () => {
    it('should dispatch GetUserQuery and map to DTO', async () => {
      queryBus.execute.mockResolvedValue(sampleUserDto);
      const result = await controller.findById('user-1');
      expect(queryBus.execute).toHaveBeenCalledWith(expect.any(GetUserQuery));
      expect(result.id).toBe('user-1');
      expect(result.email).toBe('user@example.com');
    });
  });

  describe('list', () => {
    it('should dispatch ListUsersQuery with pagination', async () => {
      queryBus.execute.mockResolvedValue({
        items: [sampleUserDto],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      });

      const result = await controller.list('1', '20');

      expect(queryBus.execute).toHaveBeenCalledWith(expect.any(ListUsersQuery));
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
    });

    it('should use default page and limit when not provided', async () => {
      queryBus.execute.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      });

      await controller.list();
      const call = queryBus.execute.mock.calls[0][0] as ListUsersQuery;
      expect(call.page).toBe(1);
      expect(call.limit).toBe(20);
    });
  });

  describe('create', () => {
    it('should dispatch CreateUserCommand and return mapped DTO', async () => {
      commandBus.execute.mockResolvedValue(sampleUserDto);

      const result = await controller.create({
        email: 'user@example.com',
        password: 'Test123!@#',
        type: 'individual',
        acceptTerms: true,
      });

      expect(commandBus.execute).toHaveBeenCalledWith(expect.any(CreateUserCommand));
      expect(result.email).toBe('user@example.com');
    });
  });

  describe('delete', () => {
    it('should dispatch DeleteUserCommand', async () => {
      commandBus.execute.mockResolvedValue({ success: true });
      await controller.delete('user-1');
      expect(commandBus.execute).toHaveBeenCalled();
    });
  });

  describe('activate', () => {
    it('should dispatch ActivateUserCommand', async () => {
      commandBus.execute.mockResolvedValue(sampleUserDto);
      const result = await controller.activate('user-1');
      expect(result.id).toBe('user-1');
    });
  });
});
