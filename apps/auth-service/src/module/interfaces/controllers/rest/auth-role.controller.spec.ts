/**
 * AuthRoleController — Unit Tests
 */
import { jest } from '@jest/globals';

import { Test } from '@nestjs/testing';
import { QueryBus } from '@nestjs/cqrs';
import { AuthRoleController } from './auth-role.controller.js';

const mockQueryBus = () => ({ execute: jest.fn() as jest.Mock });

describe('AuthRoleController', () => {
  let controller: AuthRoleController;
  let queryBus: ReturnType<typeof mockQueryBus>;

  beforeEach(async () => {
    queryBus = mockQueryBus();

    const moduleRef = await Test.createTestingModule({
      controllers: [AuthRoleController],
      providers: [{ provide: QueryBus, useValue: queryBus }],
    }).compile();

    controller = moduleRef.get(AuthRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('list() dispatches ListAuthRolesQuery', async () => {
    queryBus.execute.mockResolvedValue([]);
    await controller.list();
    expect(queryBus.execute).toHaveBeenCalled();
  });
});
